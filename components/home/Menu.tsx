import React from "react";

const Menu = () => {
  const menuSections = [
    {
      title: "Dinner Special Menu",
      items: [
        {
          name: "Crispy Chicken Poblano",
          desc: "Beef, chicken, turkey",
          price: "$120",
          img: "plate1.jpg",
        },
        {
          name: "Crispy Chicken Poblano",
          desc: "Beef, chicken, turkey",
          price: "$125",
          img: "plate1.jpg",
        },
        {
          name: "Crispy Chicken Poblano",
          desc: "Beef, chicken, turkey",
          price: "$184",
          img: "plate1.jpg",
        },
        {
          name: "Crispy Chicken Poblano",
          desc: "Beef, chicken, turkey",
          price: "$187",
          img: "plate1.jpg",
        },
        {
          name: "Crispy Chicken Poblano",
          desc: "Beef, chicken, turkey",
          price: "$196",
          img: "plate1.jpg",
        },
        {
          name: "Crispy Chicken Poblano",
          desc: "Beef, chicken, turkey",
          price: "$158",
          img: "plate1.jpg",
        },
        {
          name: "Crispy Chicken Poblano",
          desc: "Beef, chicken, turkey",
          price: "$115",
          img: "plate1.jpg",
        },
        {
          name: "Crispy Chicken Poblano",
          desc: "Beef, chicken, turkey",
          price: "$100",
          img: "plate1.jpg",
        },
      ],
    },
    {
      title: "Dinner Special Menu",
      items: [
        {
          name: "Crispy Chicken Poblano",
          desc: "Beef, chicken, turkey",
          price: "$120",
          img: "plate1.jpg",
        },
        {
          name: "Crispy Chicken Poblano",
          desc: "Beef, chicken, turkey",
          price: "$125",
          img: "plate1.jpg",
        },
        {
          name: "Crispy Chicken Poblano",
          desc: "Beef, chicken, turkey",
          price: "$184",
          img: "plate1.jpg",
        },
        {
          name: "Crispy Chicken Poblano",
          desc: "Beef, chicken, turkey",
          price: "$187",
          img: "plate1.jpg",
        },
        {
          name: "Crispy Chicken Poblano",
          desc: "Beef, chicken, turkey",
          price: "$196",
          img: "plate1.jpg",
        },
        {
          name: "Crispy Chicken Poblano",
          desc: "Beef, chicken, turkey",
          price: "$158",
          img: "plate1.jpg",
        },
        {
          name: "Crispy Chicken Poblano",
          desc: "Beef, chicken, turkey",
          price: "$115",
          img: "plate1.jpg",
        },
        {
          name: "Crispy Chicken Poblano",
          desc: "Beef, chicken, turkey",
          price: "$100",
          img: "plate1.jpg",
        },
      ],
    },
    {
      title: "Dinner Special Menu",
      items: [
        {
          name: "Crispy Chicken Poblano",
          desc: "Beef, chicken, turkey",
          price: "$120",
          img: "plate1.jpg",
        },
        {
          name: "Crispy Chicken Poblano",
          desc: "Beef, chicken, turkey",
          price: "$125",
          img: "plate1.jpg",
        },
        {
          name: "Crispy Chicken Poblano",
          desc: "Beef, chicken, turkey",
          price: "$184",
          img: "plate1.jpg",
        },
        {
          name: "Crispy Chicken Poblano",
          desc: "Beef, chicken, turkey",
          price: "$187",
          img: "plate1.jpg",
        },
        {
          name: "Crispy Chicken Poblano",
          desc: "Beef, chicken, turkey",
          price: "$196",
          img: "plate1.jpg",
        },
        {
          name: "Crispy Chicken Poblano",
          desc: "Beef, chicken, turkey",
          price: "$158",
          img: "plate1.jpg",
        },
        {
          name: "Crispy Chicken Poblano",
          desc: "Beef, chicken, turkey",
          price: "$115",
          img: "plate1.jpg",
        },
        {
          name: "Crispy Chicken Poblano",
          desc: "Beef, chicken, turkey",
          price: "$100",
          img: "plate1.jpg",
        },
      ],
    },
  ];
  return (
    <div className="px-5 py-10">
      <div className="container mx-auto">
        <div className="bg-cream min-h-screen py-10 px-4 md:px-16">
          {menuSections.map((section, idx) => (
            <div key={idx} className="mb-16 text-center">
              <h2 className="text-2xl lg:text-3xl font-semibold text-green-900 mb-10">
                {section.title}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center gap-5 border-b pb-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="text-left overflow-hidden">
                        <h4 className="font-bold text-md text-gray-800 truncate lg:whitespace-normal lg:truncate-none">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500 truncate lg:whitespace-normal lg:truncate-none">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-semibold text-green-900">
                        {item.price}
                      </span>
                      <input type="checkbox" />
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-8 bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800">
                Book a Table
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
