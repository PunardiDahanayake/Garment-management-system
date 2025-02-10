import { Home, Anchor, Headphones } from "react-feather";
export const MENUITEMS = [
  {
    menutitle: "Production",
    menucontent: "QA,Inventroy & Stocks,Production Planning,Patterns",
    Items: [
      {
        title: "Production Management",
        icon: Home,
        type: "sub",
        active: false,
        children: [
          {
            path: `${process.env.PUBLIC_URL}/production/QC`,
            title: "Quality Control Management",
            type: "link",
          },
          {
            path: `${process.env.PUBLIC_URL}/production/IS`,
            title: "Inventory & Stock",
            type: "link",
          },
          {
            path: `${process.env.PUBLIC_URL}/production/PP`,
            title: "Production Planing",
            type: "link",
          },
          {
            path: `${process.env.PUBLIC_URL}/production/PM`,
            title: "Patterns Management",
            type: "link",
          },
        ],
      },
    ],
  },
  {
    menutitle: "Cost Management",
    menucontent: "Accounts,HR,IE,Marketing",
    Items: [
      {
        title: "Cost Management",
        icon: Anchor,
        type: "sub",
        active: false,
        children: [
          {
            path: `${process.env.PUBLIC_URL}/cost/AM`,
            title: "Account Management",
            type: "link",
          },
          {
            path: `${process.env.PUBLIC_URL}/cost/HR`,
            title: "HR Management",
            type: "link",
          },
          {
            path: `${process.env.PUBLIC_URL}/cost/IE`,
            title: "Industrial Engineering Management",
            type: "link",
          },
          {
            path: `${process.env.PUBLIC_URL}/cost/MM`,
            title: "Marketing Management",
            type: "link",
          },
        ],
      },
    ],
  },
  // {
  //     menutitle:"Support",
  //     menucontent:"",
  //     Items:[
  //         {
  //             title: 'Raise Support', icon: Headphones, type: 'sub',active: false, children: [
  //                     { title: 'Raise Ticket', type: 'exteral_link', path: 'http://support.pixelstrap.com/help-center' },
  //             ]
  //         }
  //     ]
  // },
];
