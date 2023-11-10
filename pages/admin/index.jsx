import React, { useState, useEffect} from "react";
import SideBar from "../../components/dashboard_navbar/Sidebar";
import withAuth from "../../hoc/withAuth";
import Dashboard1 from "@/components/dashboard/dashboard1";
import Dashboard2 from "@/components/dashboard/dashboard2";
import { checkplan } from "@/apis/apis";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();

  const ispaid = async () => {
    const data = await checkplan()
    if (data.success == false) {
      router.push("/pricing")
    }
  }

  useEffect(() => {
    ispaid();
  }, []);


  return (
    <>
      <div className="containers">
        <div className="container-sidebar">
          <SideBar />
        </div>
        <div className="container-pages">
          <Dashboard1 />
          <Dashboard2 />
        </div>
      </div>
      <style jsx>
        {`
          .containers {
            height: 100vh;
            display: flex;
            // color: #626262;
          }

          .container-pages {
            margin: 70px 0 0 0;
            height: fit-content;

            width: 100%;

            padding: 20px 30px;
          }
        `}
      </style>
    </>
  );
};

export default withAuth(Index);
