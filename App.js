import React, { useEffect } from "react";
import "./default.scss";
//components
import AdminToolbar from './components/AdminToolbar/index'
//hoc
import WithAuth from './../src/hoc/index'


//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

//pages
import Login from "./pages/Login";
import Homepage from "./pages/Homepage/index";
import Registration from "./pages/Registration";
import { Switch, Route} from "react-router-dom";

import Recovery from "./pages/Recovery";
import { useDispatch } from "react-redux";
import { checkUserSession } from "./redux/User/user.actions";
import Dashboard from "./pages/Dashboard/index";
import Admin from "./pages/Admin";
import WithAdminAuth from "./hoc/withAdminAuth";
import AdminLayout from "./layouts/AdminLayout";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import PaymentDetails from "./components/PaymentDetails";
import Payment from "./pages/Payment";
import DashBoardLayout from "./layouts/DashboardLayout";
import Order from "./pages/Order";


const App = (props) => {

const dispatch = useDispatch()

useEffect(() => {
dispatch(checkUserSession())

}, [])



/*
useEffect(() => {

// authListener@ vorpes funccia e kanchvac nerqevum, vorovhetev firebaseic funkcia e veradardzvum

const authListener = auth.onAuthStateChanged( async (userAuth) => {
      if (userAuth) {

   const userRef = await handleUserProfile(userAuth);
   userRef.onSnapshot(snapshot => {

  dispatch(setCurrentUser({

         id: snapshot.id,
        ...snapshot.data()

    }))

       })
  

   }
      

  dispatch(setCurrentUser(userAuth))

 
       
    });

    return () => {

    authListener();

    }


}, [])

  */




    return (
      <div className="App">
        <AdminToolbar />
        
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomepageLayout >
                <Homepage />
              </HomepageLayout>
            )}
          />
            <Route exact path="/search"
            render={() => (
              <MainLayout >
                <Search />
              </MainLayout>
            )}
          />

               <Route  path="/search/:filterType"
            render={() => (
              <MainLayout >
                <Search />
              </MainLayout>
            )}
          />

        <Route  path="/product/:productID"
            render={() => (
              <MainLayout >
                <ProductDetails />
              </MainLayout>
            )}
          />
            <Route  path="/cart"
            render={() => (
              <MainLayout >
                <Cart />
              </MainLayout>
            )}
          />

/>
            <Route  path="/payment"
            render={() => (
              <WithAuth>
              <MainLayout >
                <Payment />
              </MainLayout>
              </WithAuth>
            )}
          />

          <Route
            path="/registration"
            render={() =>(
              <MainLayout >
                <Registration />
              </MainLayout>
            )}
          />
          <Route
            path="/login"
            render={() => (
              <MainLayout >
                <Login />
              </MainLayout>
            )}
          />

             <Route
            path="/recovery" render={() =>  (
              <MainLayout>
             <Recovery />
             </MainLayout>
            )}
          />

         <Route
            path="/dashboard" render={() =>  (
              <WithAuth>
                <DashBoardLayout>
                 <Dashboard />
              </DashBoardLayout>
            </WithAuth>
            )}
          />
         <Route
            path="/order/:orderID" render={() =>  (
              <WithAuth>
                <DashBoardLayout>
                 <Order />
              </DashBoardLayout>
            </WithAuth>
            )}
          />



        <Route
            path="/admin" render={() =>  (
              <WithAdminAuth>
               <AdminLayout >
                <Admin />
              </AdminLayout>
             </WithAdminAuth>
            )}
          />
          
        </Switch>
 
          
                
      </div>
    );
  
            }


export default App;
