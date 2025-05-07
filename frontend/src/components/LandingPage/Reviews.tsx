const Reviews = () => {
    // Define dynamic values for the reviews and other properties
    const reviewsData = [
      {
        quote: "I got tickets to my favorite concert with just a few clicks. The process was so smooth! Thanks a lot",
        name: "Sabarish Vs",
        email: "sa@gmail.com",
        profileImg: "./images/Pro.png",
      },
      {
        quote: "I got tickets to my favorite concert with just a few clicks. The process was so smooth! Thanks a lot",
        name: "John Doe",
        email: "john.doe@gmail.com",
        profileImg: "./images/Pro.png",
      },
      {
        quote: "I got tickets to my favorite concert with just a few clicks. The process was so smooth! Thanks a lot",
        name: "Jane Smith",
        email: "jane.smith@gmail.com",
        profileImg: "./images/Pro.png",
      },
      {
        quote: "I got tickets to my favorite concert with just a few clicks. The process was so smooth! Thanks a lot",
        name: "Alex Brown",
        email: "alex.brown@gmail.com",
        profileImg: "./images/Pro.png",
      },
    ];
  
    const borderGradient = "linear-gradient(to bottom, #8D59C2, #000000)";
    const backgroundColor = "rgba(132, 122, 122, 0.16)";
    const mainBackground = "linear-gradient(180deg, #000 0%, #0F081E 100%)";
    const titleText = "Reviews";
    const headerTitle = "What Our Users Are Saying";
    const headerDescription = "From discovering events to selling your own tickets, BuyMyTix makes the entire process seamless, secure, and effortless.";
  
    return (
      <div
        className="flex justify-center gap-8 px-4 md:px-[42px] py-5 md:py-[108px] flex-col bg-gradient-to-b"
        style={{
          borderColor: "#8D59C2",
          background: mainBackground,
        }}
      >
        {/* Title */}
        <div className="flex justify-center">
          <div className="px-4 py-2 rounded-[24px] self-center w-fit bg-[#fff] text-[#150C29] font-semibold text-[20px]">
            {titleText}
          </div>
        </div>
  
        {/* Header */}
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-[#fff] font-bold text-[clamp(22px,5vw,32px)]">
            {headerTitle}
          </h2>
          <p className="text-[#fff] text-[clamp(16px,4vw,24px)] font-medium">
            {headerDescription}
          </p>
        </div>
  
        {/* Steps */}
        <div className="flex flex-wrap gap-4 text-white relative justify-center">
          {reviewsData.map((review, index) => (
            <div
              key={index}
              className="rounded-[9px] flex flex-col flex-1 min-w-[280px] max-w-[350px] w-full"
              style={{
                background: backgroundColor,
                border: `1px solid ${borderGradient}`,
              }}
            >
              <div className="p-6 text-[20px] text-center">
                <p>{`"${review.quote}"`}</p>
              </div>
              <hr />
              <div className="px-6 p-3 flex gap-3 text-white items-center rounded-xl">
                <img src={review.profileImg} alt="profile" className="h-8 w-8" />
                <div className="flex flex-col text-s">
                  <p>{review.name}</p>
                  <p>{review.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Reviews;
  