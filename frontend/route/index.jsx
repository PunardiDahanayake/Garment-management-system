// dashbaord
import Account from '../components/account'

import HR from '../components/hr'
import IndustrialEngineering from '../components/industrial-engineering'
import InventoryStock from '../components/inventory-stock'
import Marketing from '../components/marketing'
import Pattern from '../components/pattern'
import ProductionPlanning from '../components/production-planing'
import QualityControl from '../components/quality-control'



export const routes = [
        // { path:`${process.env.PUBLIC_URL}/dashboard/default/:layout`, Component:Default},
        // { path:`${process.env.PUBLIC_URL}/dashboard/ecommerce/:layout`, Component:Ecommerce},
        // { path:`${process.env.PUBLIC_URL}/starter-kits/sample-page/:layout`, Component:Starterkits},


        { path:`${process.env.PUBLIC_URL}/production/QC/:layout`, Component:QualityControl},
        { path:`${process.env.PUBLIC_URL}/production/IS/:layout`, Component:InventoryStock},
        { path:`${process.env.PUBLIC_URL}/production/PP/:layout`, Component:ProductionPlanning},
        { path:`${process.env.PUBLIC_URL}/production/PM/:layout`, Component:Pattern},
        { path:`${process.env.PUBLIC_URL}/cost/AM/:layout`, Component:Account},
        { path:`${process.env.PUBLIC_URL}/cost/HR/:layout`, Component:HR},
        { path:`${process.env.PUBLIC_URL}/cost/IE/:layout`, Component:IndustrialEngineering},
        { path:`${process.env.PUBLIC_URL}/cost/MM/:layout`, Component:Marketing},

        
]