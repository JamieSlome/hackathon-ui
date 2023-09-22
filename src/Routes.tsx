import type { LoaderFunctionArgs } from "react-router-dom";
import {
  Form,
  RouterProvider,
  createBrowserRouter,
  redirect,
  useActionData,
  useLocation,
  useNavigation,
} from "react-router-dom";
import { fakeAuthProvider } from "./auth";
import { Beneficiaries } from "./pages/beneficiaries";
import { BeneficiaryForm } from "./pages/beneficiary";
import { Layout } from "./components";
import { Dashboard } from "./dashboard";
import { Beneficiary } from "./pages/beneficiary/Beneficiary";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      // Our root route always provides the user, if logged in
      return { user: fakeAuthProvider.username };
    },
    children: [
      {
        path: "/",
        // loader: protectedLoader,
        Component: Layout,
        children: [
          {
            path: "/beneficiaries",
            element: <Beneficiaries />,
          },
          {
            path: "/beneficiaries/:id/:tab",
            element: <Beneficiary />,
          },
          {
            path: "/beneficiaries/new",
            element: <BeneficiaryForm isNew />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "login",
        action: loginAction,
        loader: loginLoader,
        Component: LoginPage,
      },
    ],
  },
  {
    path: "/logout",
    async action() {
      // We signout in a "resource route" that we can hit from a fetcher.Form
      await fakeAuthProvider.signout();
      return redirect("/");
    },
  },
]);

export default function Routes() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}

// function AuthStatus() {
//   // Get our logged in user, if they exist, from the root route loader data
//   let { user } = useRouteLoaderData("root") as { user: string | null };
//   let fetcher = useFetcher();

//   if (!user) {
//     return <p>You are not logged in.</p>;
//   }

//   let isLoggingOut = fetcher.formData != null;

//   return (
//     <div>
//       <p>Welcome {user}!</p>
//       <fetcher.Form method="post" action="/logout">
//         <button type="submit" disabled={isLoggingOut}>
//           {isLoggingOut ? "Signing out..." : "Sign out"}
//         </button>
//       </fetcher.Form>
//     </div>
//   );
// }

async function loginAction({ request }: LoaderFunctionArgs) {
  let formData = await request.formData();
  let username = formData.get("username") as string | null;

  // Validate our form inputs and return validation errors via useActionData()
  if (!username) {
    return {
      error: "You must provide a username to log in",
    };
  }

  // Sign in and redirect to the proper destination if successful.
  try {
    await fakeAuthProvider.signin(username);
  } catch (error) {
    // Unused as of now but this is how you would handle invalid
    // username/password combinations - just like validating the inputs
    // above
    return {
      error: "Invalid login attempt",
    };
  }

  let redirectTo = formData.get("redirectTo") as string | null;
  return redirect(redirectTo || "/");
}

async function loginLoader() {
  if (fakeAuthProvider.isAuthenticated) {
    return redirect("/");
  }
  return null;
}

function LoginPage() {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let from = params.get("from") || "/";

  let navigation = useNavigation();
  let isLoggingIn = navigation.formData?.get("username") != null;

  let actionData = useActionData() as { error: string } | undefined;

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <Form method="post" replace>
        <input type="hidden" name="redirectTo" value={from} />
        <label>
          Username: <input name="username" />
        </label>{" "}
        <button type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
        {actionData && actionData.error ? (
          <p style={{ color: "red" }}>{actionData.error}</p>
        ) : null}
      </Form>
    </div>
  );
}

// function protectedLoader({ request }: LoaderFunctionArgs) {
//   // If the user is not logged in and tries to access `/protected`, we redirect
//   // them to `/login` with a `from` parameter that allows login to redirect back
//   // to this page upon successful authentication
//   if (!fakeAuthProvider.isAuthenticated) {
//     let params = new URLSearchParams();
//     params.set("from", new URL(request.url).pathname);
//     return redirect("/login?" + params.toString());
//   }
//   return null;
// }
