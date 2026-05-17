
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/loading/Loading";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
} from "lucide-react";

const COLORS = ["#6366f1", "#10b981"];

export default function StatCard() {
  const { data: session } = useSession();
  const [dashboard, setDashboard] = useState<any>(null);

  const getDashboard = async () => {
    try {
      const { data } = await axios.get("/api/dashboard/");
      setDashboard(data.data);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  if (!dashboard) return <Loading />;

  const revenueData = [
    {
      name: "Revenue",
      total: dashboard.totalRevenue,
      today: dashboard.todayRevenue,
    },
  ];

  const orderData = [
    {
      name: "Paid",
      value: dashboard.paidOrders,
    },
    {
      name: "Remaining",
      value:
        dashboard.totalOrders - dashboard.paidOrders,
    },
  ];

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center p-4 rounded-xl bg-white dark:bg-gray-800 shadow">
        <div>
          <h1 className="text-xl font-bold">
            Welcome 👋
          </h1>

          <p className="text-gray-500">
            {session?.user?.name}
          </p>
        </div>

        <img
          src={session?.user?.image || ""}
          className="w-12 h-12 rounded-full"
          alt=""
        />
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-5">
        <Card
          title="Revenue"
          value={`${dashboard.totalRevenue} EGP`}
          icon={<DollarSign />}
        />
        <Card
          title="Orders"
          value={dashboard.totalOrders}
          icon={<ShoppingCart />}
        />
        <Card
          title="Users"
          value={dashboard.totalUsers}
          icon={<Users />}
        />

        <Card
          title="Products"
          value={dashboard.totalProducts}
          icon={<Package />}
        />

      </div>

      {/* Charts */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl shadow">
          <h2 className="mb-4 font-bold">
            Revenue Analytics
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
            
          >
            <BarChart 
            data={revenueData}>
              <Tooltip />
              <Bar
                dataKey="total"
                radius={[10, 10, 0, 0]}
                fill="#8B5CF6"
                fillOpacity={0.9}
              />
              <Bar
                dataKey="today"
                fill="#06B6D4"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl shadow">
          <h2 className="mb-4 font-bold">
            Orders Status
          </h2>
          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={orderData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {orderData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

function Card({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="
    bg-white
    dark:bg-gray-800
    rounded-xl
    p-5
    shadow
    flex
    justify-between
    items-center
    ">

      <div>
        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <h2 className="text-2xl font-bold mt-2">
          {value}
        </h2>
      </div>

      <div className="
      p-3
      rounded-full
      bg-indigo-100
      dark:bg-indigo-500/20
      ">
        {icon}
      </div>

    </div>
  );
}