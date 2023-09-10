"use client";
import React from "react";
import {
  Navbar as DaisyUiNavbar,
  Button,
  Dropdown,
  Avatar,
} from "react-daisyui";
import { signOut, signIn, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { capitalizeFirstLetters } from "@/utils/helper";
// antd
import { Input } from "antd";
import { BellOutlined } from "@ant-design/icons";

const { Search } = Input;
const Navbar = () => {
  // const { data: session } = useSession();
  return (
    <DaisyUiNavbar className="bg-primary">
      <div className="flex-1 space-x-2">
        <Button color="ghost" className="normal-case text-xl">
          DaisyUI
        </Button>
        <div>Workspace</div>
        <Button>Create</Button>
      </div>
      <div className="flex-none space-x-2">
        <Search placeholder="Search" className="w-full " />
        <BellOutlined size={128} />
        <Avatar
          shape="circle"
          letters="T"
          size="xs"
          // src={session?.user?.image as string}
        />
      </div>
      {/* <div className="flex-none">
        {session ? <Auth session={session} /> : <Button>Login</Button>}
      </div> */}
    </DaisyUiNavbar>
  );
};

export default Navbar;

const Auth = ({ session }: { session: Session }) => {
  return (
    <div>
      <div className="flex-none">
        <Dropdown
          vertical="bottom"
          horizontal="left"
          className="flex flex-row justify-center items-center space-x-2"
        >
          <div>{capitalizeFirstLetters(session?.user?.name as string)}</div>
          <Button color="ghost" className="avatar" shape="circle">
            <Avatar
              shape="circle"
              letters="D"
              size="xs"
              src={session?.user?.image as string}
            />
          </Button>
          <Dropdown.Menu className="w-52 menu-compact ">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item onClick={() => signOut()}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};
