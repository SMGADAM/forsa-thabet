import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Friends from "./pages/Friends";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Default from "./Layouts/Default";
import Author from "./Layouts/Author";
import Users from "./pages/Users";
import Cookies from "js-cookie";
import Scholarships from "./pages/Scholarships";
import Inquiries from "./pages/Inquiries";
import Events from "./pages/Events";
import "./styles/app.css";

const App = () => {
  const user = Cookies.get('user') && JSON.parse(Cookies.get('user'));

  return (
    <>
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Default />}>
                <Route index element={<Home />} />
                <Route path="scholarships" element={<Scholarships />} />
                <Route path="inquiries" element={<Inquiries />} />
                <Route path="events" element={<Events />} />
                <Route path="friends" element={<Friends />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route path="/users" element={<Default short />}>
                <Route path=":user" element={<Users />} />
              </Route>
              <Route path="/" element={<Default short />}>
                <Route path="profile" element={<Profile />} />
              </Route>
            </>
          ) : (
            <Route path="/" element={<Author />}>
              <Route index element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
          )}
        </Routes>
    </>
  );
};

export default App;

{
  /* <Route path="/" element={<Default short />}>
        <Route path="options" element={<Options />} />
        </Route>
        <Route path="/users" element={<Default short />}>
        <Route path=":user" element={<Profile />} />
        </Route> */
}
