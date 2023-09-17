"use client";
import { checkSessionAndRedirectIfInvalid } from "@/utils/helper";
import { Board } from "./components/main";
import CreateTodoModal from "./components/CreateTodoModal";
import { Layout, Menu, Avatar, Dropdown, Space } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import { Navbar, Button } from "react-daisyui";
import { network } from "@/services";
import { GetServerSideProps, GetStaticProps } from "next";
import { useEffect } from "react";
import { workApi } from "@/services/axios";
const workspace = {
  key: "1",
  label: "Workspaces",
  children: [
    {
      key: "11",
      label: "Add member +",
    },
    {
      key: "12",
      label: "settings",
    },
    {
      key: "13",
      label: "reports",
    },
  ],
};
const boards = {
  key: "2",
  label: "Boards",
  children: [
    {
      key: "21",
      label: "option 1",
    },
    {
      key: "22",
      label: "option 2",
    },
    {
      key: "23",
      label: "option 3",
    },
  ],
};

export default function ({ repo }: any) {
  const test = async () => {
    const res = await workApi.get("/");
    console.log(res);
  };
  useEffect(() => {
    test();
  });
  // await checkSessionAndRedirectIfInvalid("/");
  return (
    <main>
      <Layout className="h-screen" hasSider>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%" }}
            items={[workspace, boards]}
          />
        </Sider>
        <Content>
          <Navbar className="bg-slate-400">
            <div className="flex-1 space-x-2">
              <div>
                <h2 className="text-2xl text-bold">Board Name</h2>
              </div>
              <Button color="ghost" className="normal-case text-xl">
                Trello
              </Button>
            </div>
            <div className="flex-none space-x-2">
              <AvatarGroup />
              <SmartOptionBoard />
              <div>Filter</div>
            </div>
          </Navbar>
          <Board />
        </Content>
      </Layout>
      <CreateTodoModal />
    </main>
  );
}

const AvatarGroup = () => {
  return (
    <Avatar.Group>
      <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
      <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
      <Avatar style={{ backgroundColor: "#87d068" }}>H</Avatar>
      <Avatar style={{ backgroundColor: "#1677ff" }}>W</Avatar>
    </Avatar.Group>
  );
};

const menuItem = [
  {
    key: "1",
    label: "Rules to automation",
  },
  {
    key: "2",
    label: "Email report",
  },
];

const SmartOptionBoard = () => {
  return (
    <Dropdown menu={{ items: menuItem }}>
      <Space>
        <Button>Smart options</Button>
      </Space>
    </Dropdown>
  );
};
