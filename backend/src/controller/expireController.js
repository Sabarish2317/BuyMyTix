const Ticket = require('../models/sellModel');
const moment = require('moment-timezone'); 



async function expiredTicket() {
    try {
       
        const currentTimeIST = moment.tz('Asia/Kolkata');  

        const expiredTickets = await Ticket.find({
            showDate: { $lt: currentTimeIST.toDate() },
            seatNumberStatus: { $elemMatch: { isSold: false } } 
        });


        for (const ticket of expiredTickets) {  
            ticket.seatNumberStatus.forEach(seat => {
                if (!seat.isSold) {
                    seat.isSold = true;  
                }
            });

            await ticket.save();
            console.log(`Ticket for ${ticket.movieId} at ${ticket.showTime} has been marked as sold.`);
        }


        console.log(`${expiredTickets.length} tickets have been marked as sold.`);
    } catch (error) {
        console.error('Error marking expired tickets as sold:', error);
    }
}


setInterval(expiredTicket, 5 * 60 * 1000); 

module.exports = { expiredTicket };
