"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, TrendingUp, Bell, Receipt, BarChart3, X, Wallet, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const notifications = {
  payments: [
    {
      id: 1,
      title: "Payment due for Invoice #1234",
      description: "Payment of $2,500 due in 3 days",
      date: "2024-03-20",
    },
    {
      id: 2,
      title: "Upcoming payment reminder",
      description: "Payment of $1,800 due next week",
      date: "2024-03-25",
    },
  ],
  overdue: [
    {
      id: 3,
      title: "Invoice #985 is overdue",
      description: "Payment of $3,200 was due on March 1st",
      amount: 3200,
      dueDate: "2024-03-01",
    },
    {
      id: 4,
      title: "Invoice #986 is overdue",
      description: "Payment of $1,500 was due on March 5th",
      amount: 1500,
      dueDate: "2024-03-05",
    },
  ],
  alerts: [
    {
      id: 5,
      title: "Bank reconciliation needed",
      description: "3 transactions need review",
      type: "warning",
    },
    {
      id: 6,
      title: "Duplicate transaction detected",
      description: "Same amount ($450) processed twice",
      type: "error",
    },
  ],
};

const balanceData = [
  { month: "Jan", balance: 19500 },
  { month: "Feb", balance: 22800 },
  { month: "Mar", balance: 21300 },
  { month: "Apr", balance: 23900 },
  { month: "May", balance: 22100 },
  { month: "Jun", balance: 23400 },
  { month: "Jul", balance: 25600 },
  { month: "Aug", balance: 24200 },
  { month: "Sep", balance: 26100 },
  { month: "Oct", balance: 23800 },
  { month: "Nov", balance: 25900 },
  { month: "Dec", balance: 24789 },
];

const incomeData = [
  { month: "Jan", income: 15800 },
  { month: "Feb", income: 19200 },
  { month: "Mar", income: 17500 },
  { month: "Apr", income: 21500 },
  { month: "May", income: 18800 },
  { month: "Jun", income: 22050 },
  { month: "Jul", income: 19900 },
  { month: "Aug", income: 23400 },
  { month: "Sep", income: 20600 },
  { month: "Oct", income: 24800 },
  { month: "Nov", income: 21900 },
  { month: "Dec", income: 24050 },
];

const netWorthData = [
  { month: "Jan", worth: 245000 },
  { month: "Feb", worth: 258000 },
  { month: "Mar", worth: 252000 },
  { month: "Apr", worth: 267000 },
  { month: "May", worth: 261000 },
  { month: "Jun", worth: 269000 },
  { month: "Jul", worth: 275000 },
  { month: "Aug", worth: 271000 },
  { month: "Sep", worth: 282000 },
  { month: "Oct", worth: 274000 },
  { month: "Nov", worth: 285000 },
  { month: "Dec", worth: 278378 },
];

export default function FinancesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Financial Dashboard</h1>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-4">
            <Card className="relative overflow-hidden border-wood bg-wood">
              <div className="absolute inset-0 bg-gradient-wood" />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Available Balance</CardTitle>
                <Wallet className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-white">$24,789.00</div>
                <p className="text-xs text-white/80">
                  Last updated: Today, 9:41 AM
                </p>
                <div className="h-[80px] mt-3">
                  <ChartContainer
                    config={{
                      balance: {
                        theme: {
                          light: "hsl(0 0% 100%)",
                          dark: "hsl(0 0% 100%)",
                        },
                      },
                    }}
                  >
                    <LineChart data={balanceData}>
                      <Line
                        type="monotone"
                        dataKey="balance"
                        strokeWidth={2}
                        dot={false}
                        style={{ stroke: "var(--color-balance)" }}
                      />
                      <XAxis dataKey="month" hide />
                      <YAxis hide />
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (!active || !payload?.length) return null;
                          return (
                            <ChartTooltipContent
                              payload={payload}
                              formatter={(value) => `$${value.toLocaleString()}`}
                            />
                          );
                        }}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-sage bg-sage">
              <div className="absolute inset-0 bg-gradient-sage" />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Income Overview</CardTitle>
                <TrendingUp className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-white">$24,050.00</div>
                <div className="h-[80px] mt-3">
                  <ChartContainer
                    config={{
                      income: {
                        theme: {
                          light: "hsl(0 0% 100%)",
                          dark: "hsl(0 0% 100%)",
                        },
                      },
                    }}
                  >
                    <LineChart data={incomeData}>
                      <Line
                        type="monotone"
                        dataKey="income"
                        strokeWidth={2}
                        dot={false}
                        style={{ stroke: "var(--color-income)" }}
                      />
                      <XAxis dataKey="month" hide />
                      <YAxis hide />
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (!active || !payload?.length) return null;
                          return (
                            <ChartTooltipContent
                              payload={payload}
                              formatter={(value) => `$${value.toLocaleString()}`}
                            />
                          );
                        }}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-wood bg-wood">
              <div className="absolute inset-0 bg-gradient-wood" />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Total Net Worth</CardTitle>
                <TrendingUp className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-white">$278,378.00</div>
                <p className="text-xs text-white/80">
                  +12.3% from last month
                </p>
                <div className="h-[80px] mt-3">
                  <ChartContainer
                    config={{
                      worth: {
                        theme: {
                          light: "hsl(0 0% 100%)",
                          dark: "hsl(0 0% 100%)",
                        },
                      },
                    }}
                  >
                    <LineChart data={netWorthData}>
                      <Line
                        type="monotone"
                        dataKey="worth"
                        strokeWidth={2}
                        dot={false}
                        style={{ stroke: "var(--color-worth)" }}
                      />
                      <XAxis dataKey="month" hide />
                      <YAxis hide />
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (!active || !payload?.length) return null;
                          return (
                            <ChartTooltipContent
                              payload={payload}
                              formatter={(value) => `$${value.toLocaleString()}`}
                            />
                          );
                        }}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="relative overflow-hidden border-tan bg-tan">
              <div className="absolute inset-0 bg-gradient-tan" />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Total Sent</CardTitle>
                <FileText className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent className="relative">
                <div className="text-2xl font-bold text-white">$12,345</div>
                <p className="text-xs text-white/80">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden border-wood bg-wood">
              <div className="absolute inset-0 bg-gradient-wood" />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Total Paid</CardTitle>
                <TrendingUp className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent className="relative">
                <div className="text-2xl font-bold text-white">$8,234</div>
                <p className="text-xs text-white/80">
                  +10.5% from last month
                </p>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden border-sage bg-sage">
              <div className="absolute inset-0 bg-gradient-sage" />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Total Overdue</CardTitle>
                <Bell className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent className="relative">
                <div className="text-2xl font-bold text-white">$4,111</div>
                <p className="text-xs text-white/80">
                  5 invoices overdue
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card className="border-sage bg-sage">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="payments" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="payments">Payment Reminders</TabsTrigger>
                    <TabsTrigger value="overdue">Overdue Invoices</TabsTrigger>
                    <TabsTrigger value="alerts">Alerts</TabsTrigger>
                  </TabsList>
                  <TabsContent value="payments">
                    <div className="space-y-4 mt-4">
                      {notifications.payments.map((notification) => (
                        <div key={notification.id} className="flex items-start justify-between space-x-4 rounded-lg border p-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{notification.title}</p>
                            <p className="text-sm text-muted-foreground">{notification.description}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="overdue">
                    <div className="space-y-4 mt-4">
                      {notifications.overdue.map((notification) => (
                        <div key={notification.id} className="flex items-start justify-between space-x-4 rounded-lg border p-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{notification.title}</p>
                            <p className="text-sm text-muted-foreground">{notification.description}</p>
                            <p className="text-sm text-destructive">Due: {notification.dueDate}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="alerts">
                    <div className="space-y-4 mt-4">
                      {notifications.alerts.map((notification) => (
                        <div key={notification.id} className="flex items-start justify-between space-x-4 rounded-lg border p-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{notification.title}</p>
                            <p className="text-sm text-muted-foreground">{notification.description}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        <TooltipProvider>
          <div className="hidden lg:flex flex-col gap-3 w-48">
            <h2 className="font-semibold">Quick Actions</h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="w-full justify-start gap-2" size="lg">
                  <FileText className="h-4 w-4" />
                  Create Invoice
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new invoice for your clients</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="w-full justify-start gap-2" size="lg">
                  <Receipt className="h-4 w-4" />
                  Record Expense
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Record a new business expense</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="w-full justify-start gap-2" size="lg">
                  <BarChart3 className="h-4 w-4" />
                  Generate Report
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Generate financial reports and analytics</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="w-full justify-start gap-2" size="lg">
                  <FileText className="h-4 w-4" />
                  Create Estimate
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new estimate for potential clients</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
}
