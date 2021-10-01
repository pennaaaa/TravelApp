const foodData = [
  {
    id: "restaurant-1",
    title: "Mì Quảng Ếch Bếp Trang",
    location: "Da Nang",
    address: "441 Ông Ích Khiêm, Quận Hải Châu, Đà Nẵng",
    image: require("../image/myQuangEch.jpg"),
    imageBig: require("../image/myQuangEch.jpg"),
    imageFood: [
      "https://cdn.guidingtech.com/imager/assets/189869/HD-Mouth-Watering-Food-Wallpapers-for-Desktop-12_4d470f76dc99e18ad75087b1b8410ea9.webp",
      "https://cdn.guidingtech.com/imager/assets/189877/HD-Mouth-Watering-Food-Wallpapers-for-Desktop-20_4d470f76dc99e18ad75087b1b8410ea9.webp",
      "https://cdn.guidingtech.com/imager/assets/189867/HD-Mouth-Watering-Food-Wallpapers-for-Desktop-10_4d470f76dc99e18ad75087b1b8410ea9.webp",
    ],
    liked: true,
    description: `  Nếu bạn đang tìm kiếm khách sạn dành cho gia đình ở Thành phố Hồ Chí Minh, hãy thử nghiệm Khách sạn Paragon Sài Gòn.
    Trong khi ở Khách sạn Paragon Sài Gòn, du k89hách có thể khám phá Nhà hát Thành Phố Hồ Chí Minh (0,3 km) và Phố đi bộ Nguyễn Huệ (0,5 km), một trong những điểm đến hàng đầu của Thành phố Hồ Chí Minh.
    Là “ngôi nhà xa xứ,” các phòng khách sạn cung cấp tv màn hình phẳng, quầy bar mini và điều hòa nhiệt độ, và kết nối mạng thật dễ dàng, với wifi miễn phí sẵn có.`,
    pricefrom: 29000,
    priceto: 64000,
    rating: 4,
  },
  {
    id: "restaurant-2",
    title: "Bánh xèo Bà Dưỡng",
    location: "Da Nang",
    address: "K280/23 Hoàng Diệu, Quận Hải Châu, Đà Nẵng",
    image: require("../image/banhXeo.jpg"),
    imageBig: require("../image/banhXeo.jpg"),
    imageFood: [
      "https://cdn.guidingtech.com/imager/assets/189869/HD-Mouth-Watering-Food-Wallpapers-for-Desktop-12_4d470f76dc99e18ad75087b1b8410ea9.webp",
      "https://cdn.guidingtech.com/imager/assets/189877/HD-Mouth-Watering-Food-Wallpapers-for-Desktop-20_4d470f76dc99e18ad75087b1b8410ea9.webp",
      "https://cdn.guidingtech.com/imager/assets/189867/HD-Mouth-Watering-Food-Wallpapers-for-Desktop-10_4d470f76dc99e18ad75087b1b8410ea9.webp",
    ],
    liked: true,
    description: `  Nếu bạn đang tìm kiếm khách sạn dành cho gia đình ở Thành phố Hồ Chí Minh, hãy thử nghiệm Khách sạn Paragon Sài Gòn.
    Trong khi ở Khách sạn Paragon Sài Gòn, du k89hách có thể khám phá Nhà hát Thành Phố Hồ Chí Minh (0,3 km) và Phố đi bộ Nguyễn Huệ (0,5 km), một trong những điểm đến hàng đầu của Thành phố Hồ Chí Minh.
    Là “ngôi nhà xa xứ,” các phòng khách sạn cung cấp tv màn hình phẳng, quầy bar mini và điều hòa nhiệt độ, và kết nối mạng thật dễ dàng, với wifi miễn phí sẵn có.`,
    pricefrom: 20000,
    priceto: 55000,
    rating: 4,
  },
  {
    id: "restaurant-3",
    title: "Mì Quảng Bà Vị",
    location: "Da Nang",
    address: "166 Lê Đình Dương, Quận Hải Châu, Đà Nẵng",
    image: require("../image/myQuang.jpg"),
    imageBig: require("../image/myQuang.jpg"),
    imageFood: [
      "https://cdn.guidingtech.com/imager/assets/189869/HD-Mouth-Watering-Food-Wallpapers-for-Desktop-12_4d470f76dc99e18ad75087b1b8410ea9.webp",
      "https://cdn.guidingtech.com/imager/assets/189877/HD-Mouth-Watering-Food-Wallpapers-for-Desktop-20_4d470f76dc99e18ad75087b1b8410ea9.webp",
      "https://cdn.guidingtech.com/imager/assets/189867/HD-Mouth-Watering-Food-Wallpapers-for-Desktop-10_4d470f76dc99e18ad75087b1b8410ea9.webp",
    ],
    liked: true,
    description: `  Nếu bạn đang tìm kiếm khách sạn dành cho gia đình ở Thành phố Hồ Chí Minh, hãy thử nghiệm Khách sạn Paragon Sài Gòn.
    Trong khi ở Khách sạn Paragon Sài Gòn, du k89hách có thể khám phá Nhà hát Thành Phố Hồ Chí Minh (0,3 km) và Phố đi bộ Nguyễn Huệ (0,5 km), một trong những điểm đến hàng đầu của Thành phố Hồ Chí Minh.
    Là “ngôi nhà xa xứ,” các phòng khách sạn cung cấp tv màn hình phẳng, quầy bar mini và điều hòa nhiệt độ, và kết nối mạng thật dễ dàng, với wifi miễn phí sẵn có.`,
    pricefrom: 30000,
    priceto: 55000,
    rating: 4,
  },
  {
    id: "restaurant-4",
    title: "Bánh Bèo Bà Bé",
    location: "Da Nang",
    address: "100 Hoàng Văn Thụ, Quận Hải Châu, Đà Nẵng",
    image: require("../image/banhBeo.jpg"),
    imageBig: require("../image/banhBeo.jpg"),
    imageFood: [
      "https://cdn.guidingtech.com/imager/assets/189869/HD-Mouth-Watering-Food-Wallpapers-for-Desktop-12_4d470f76dc99e18ad75087b1b8410ea9.webp",
      "https://cdn.guidingtech.com/imager/assets/189877/HD-Mouth-Watering-Food-Wallpapers-for-Desktop-20_4d470f76dc99e18ad75087b1b8410ea9.webp",
      "https://cdn.guidingtech.com/imager/assets/189867/HD-Mouth-Watering-Food-Wallpapers-for-Desktop-10_4d470f76dc99e18ad75087b1b8410ea9.webp",
    ],
    liked: true,
    description: `  Nếu bạn đang tìm kiếm khách sạn dành cho gia đình ở Thành phố Hồ Chí Minh, hãy thử nghiệm Khách sạn Paragon Sài Gòn.
  Trong khi ở Khách sạn Paragon Sài Gòn, du k89hách có thể khám phá Nhà hát Thành Phố Hồ Chí Minh (0,3 km) và Phố đi bộ Nguyễn Huệ (0,5 km), một trong những điểm đến hàng đầu của Thành phố Hồ Chí Minh.
  Là “ngôi nhà xa xứ,” các phòng khách sạn cung cấp tv màn hình phẳng, quầy bar mini và điều hòa nhiệt độ, và kết nối mạng thật dễ dàng, với wifi miễn phí sẵn có.`,
    pricefrom: 10000,
    priceto: 22000,
    rating: 4,
  },
];
export default foodData;
