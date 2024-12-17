
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/Footer';

import AddGeoMap from './Components/AddGeoMap';
import ViewAllMaps from './Components/ViewAllMaps';

import ViewAlert from './Components/ViewAlert';


import Home1 from './Components/Home1';
import AdminSignup from './Components/AdminSignup';
import AdminLogin from './Components/AdminLogin';
import TeamLeadSignup from './Components/TeamLeadSignup';
import TeamLeadLogin from './Components/TeamLeadLogin';
import AdminPage from './pages/AdminPage';
import TeamLeadPage from './pages/TeamLeadPage';

import ClientSignup from './Components/ClientSignup';
import ClientLogin from './Components/ClientLogin';
import ClientPage from './pages/ClientPage';

import WorkerSignup from './Components/WorkerSignup';
import WorkerLogin from './Components/WorkerLogin';
import WorkerPage from './pages/WorkerPage';


import InventoryHome from './Components/InventoryHome';
import Supplier from './Components/Supplier';
import Inventory from './Components/Inventory';

import CampaignHome from './Components/CampaignHome';
import CreateCampaign from './Components/CreateCampaign';
import CampaignList from './Components/CampaignList';
import NextScreen from './Components/NextScreen';                   

import PolioCasesChart from './Components/PolioCasesChart';
import PolioHeatMap from './Components/PolioHeatMap';

import PostHome from './Components/PostHome';
import PostForm from './Components/PostForm'; // Import CreatePost
import PostList from './Components/PostList'; // Import ViewPosts
import PostViewForClient from './Components/PostViewForClient';


import ViewAdverseReport from './Components/ViewAdverseReport';

import ClientAdversePost from './Components/ClientAdversePost';




function App() {
  return (
    <div className="App">
      <Router>
      
        <Switch>

          
          <Route exact path="/" component={Home1} />
          <Route path="/admin/signup" component={AdminSignup} />
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/admin" component={AdminPage} />

          <Route path="/teamlead/signup" component={TeamLeadSignup} />
          <Route path="/teamlead/login" component={TeamLeadLogin} />
          <Route path="/teamlead" component={TeamLeadPage} />

          <Route path="/client/signup" component={ClientSignup} />
          <Route path="/client/login" component={ClientLogin} />
          <Route path="/client" component={ClientPage} />

          <Route path="/worker/signup" component={WorkerSignup} />
          <Route path="/worker/login" component={WorkerLogin} />
          <Route path="/worker" component={WorkerPage} />


          <Route path="/home" component ={Home}/>
         
          <Route path="/map/:name" component ={AddGeoMap}/>
          

          <Route path="/viewAllMaps" component={ViewAllMaps} />
          

         
          <Route path="/inventoryHome" component={InventoryHome} />
          <Route path="/supplier" component={Supplier} />
          <Route path="/inventory" component={Inventory} />

        
          <Route path="/campaignHome" component={CampaignHome} />
          <Route path="/create-campaign" component={CreateCampaign} />
          <Route path="/campaigns" component={CampaignList} />
          <Route path="/nextScreen" component={NextScreen} />

          <Route path="/polioCasesChart" component={PolioCasesChart} />
          <Route path="/polioHeatMap" component={PolioHeatMap} />

          <Route path="/postHome" component={PostHome} />
          <Route path="/postForm" component={PostForm} />
          <Route path="/postList" component={PostList} />
          <Route path="/postViewForClient" component={PostViewForClient} />

          <Route path="/viewAdverseReport" component={ViewAdverseReport} />
          <Route path="/clientAdversePost" component={ClientAdversePost} />

          <Route path="/footer" component={Footer} />

          <Route path="/viewAlert" component={ViewAlert} />
        </Switch>

      </Router>
     

     
    </div>
  );
}

export default App;
