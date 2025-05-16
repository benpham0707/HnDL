"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BookingBlock {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  color?: string;
  sendInvoice?: boolean;
}

const generateRandomBookings = () => {
  const bookings: BookingBlock[] = [];
  const titles = [
    "Team Sync",
    "Client Meeting",
    "Design Review",
    "Strategy Session",
    "Project Planning",
    "Code Review",
    "Marketing Sync",
    "Sales Call",
    "Product Demo",
    "Stakeholder Update"
  ];
  const descriptions = [
    "Weekly team alignment",
    "Monthly progress review",
    "Quarterly planning",
    "Project milestone review",
    "Sprint planning",
    "Feature discussion",
    "Requirements gathering",
    "Feedback session",
    "Status update",
    "Technical discussion"
  ];
  const colors = [
    "bg-blue-400/80 text-white",
    "bg-green-400/80 text-white",
    "bg-purple-400/80 text-white",
    "bg-pink-400/80 text-white",
    "bg-orange-400/80 text-white",
    "bg-red-400/80 text-white",
    "bg-yellow-400/80 text-black",
    "bg-cyan-400/80 text-white",
    "bg-indigo-400/80 text-white",
    "bg-emerald-400/80 text-white"
  ];

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const numBookings = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < numBookings; i++) {
      const startHour = 9 + Math.floor(Math.random() * 7);
      const startMinute = Math.floor(Math.random() * 4) * 15;
      const durationHours = 1 + Math.floor(Math.random() * 2);
      
      const startTime = `${String(startHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}`;
      const endTime = `${String(startHour + durationHours).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}`;
      
      const date = new Date(year, month, day);
      const dateStr = date.toISOString().split('T')[0];
      
      bookings.push({
        id: `${dateStr}-${i}`,
        date: dateStr,
        startTime,
        endTime,
        title: titles[Math.floor(Math.random() * titles.length)],
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        sendInvoice: Math.random() < 0.5
      });
    }
  }

  return bookings;
};

const initialBookings = generateRandomBookings();

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [blocks, setBlocks] = useState<BookingBlock[]>(initialBookings);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("bg-blue-400/80 text-white");
  const [sendInvoice, setSendInvoice] = useState(false);

  const handleAddBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !startTime || !endTime || !title) return;
    
    const dateStr = selectedDate.toISOString().split("T")[0];
    const newBlock: BookingBlock = {
      id: `${dateStr}-${Date.now()}`,
      date: dateStr,
      startTime,
      endTime,
      title,
      description,
      color,
      sendInvoice,
    };
    
    setBlocks(prevBlocks => [...prevBlocks, newBlock]);
    setStartTime("");
    setEndTime("");
    setTitle("");
    setDescription("");
    setSendInvoice(false);
    setDialogOpen(false);
  };

  const blocksForSelectedDate = selectedDate
    ? blocks.filter((block) => block.date === selectedDate.toISOString().split("T")[0])
    : [];

  const hasBookings = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return blocks.some(block => block.date === dateStr);
  };

  return (
    <div className="space-y-6 p-4 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Booking</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Card className="border-sage bg-sage">
            <CardHeader className="!bg-transparent">
              <CardTitle className="text-foreground">Monthly Overview</CardTitle>
            </CardHeader>
            <CardContent className="!bg-transparent !p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => setSelectedDate(date as Date)}
                showOutsideDays
                modifiers={{
                  booked: (date) => hasBookings(date),
                }}
                modifiersStyles={{
                  booked: { 
                    backgroundColor: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                    fontWeight: "bold"
                  }
                }}
                styles={{
                  cell: { 
                    height: '140px', 
                    width: '100%',
                    backgroundColor: 'transparent'
                  },
                  caption: { 
                    marginBottom: '0', 
                    color: 'hsl(var(--foreground))', 
                    fontSize: '1.1rem', 
                    fontWeight: 'bold',
                    backgroundColor: 'transparent'
                  },
                  head_cell: { 
                    width: '100%',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                    color: 'hsl(var(--muted-foreground))',
                    backgroundColor: 'transparent'
                  },
                  table: {
                    width: '100%',
                    borderCollapse: 'separate',
                    borderSpacing: '2px',
                    backgroundColor: 'transparent'
                  },
                  nav_button_previous: {
                    color: 'hsl(var(--foreground))',
                    width: '2rem',
                    height: '2rem',
                    opacity: '1'
                  },
                  nav_button_next: {
                    color: 'hsl(var(--foreground))',
                    width: '2rem',
                    height: '2rem',
                    opacity: '1'
                  },
                  day: {
                    color: 'hsl(var(--foreground))',
                    backgroundColor: 'transparent'
                  }
                }}
                className="rounded-md border border-border p-4"
                components={{
                  Day: ({ date, displayMonth, selected, ...props }) => {
                    const dateStr = date.toISOString().split('T')[0];
                    const dayBlocks = blocks.filter(block => block.date === dateStr);
                    const isCurrentMonth = date.getMonth() === displayMonth;
                    
                    return (
                      <div 
                        className={`relative h-[140px] w-full p-1 border border-border rounded-sm hover:bg-accent transition-colors cursor-pointer ${
                          selected ? 'bg-accent' : 'bg-background'
                        }`}
                        onClick={() => setSelectedDate(date)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedDate(date);
                          }
                        }}
                      >
                        <button 
                          type="button"
                          {...props}
                          className={`absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full hover:bg-accent text-foreground ${
                            date.toDateString() === new Date().toDateString() ? 'font-bold bg-primary text-primary-foreground' : ''
                          } ${selected ? 'bg-primary text-primary-foreground' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDate(date);
                          }}
                        >
                          {date.getDate()}
                        </button>
                        <div className="pt-8 space-y-1">
                          {dayBlocks.slice(0, 3).map((block, i) => (
                            <div
                              key={block.id}
                              className={`text-xs truncate px-1 py-0.5 rounded-sm ${block.color} hover:brightness-110 transition-all`}
                              title={block.title}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDate(date);
                              }}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  setSelectedDate(date);
                                }
                              }}
                            >
                              {block.title}
                            </div>
                          ))}
                          {dayBlocks.length > 3 && (
                            <div 
                              className="text-xs text-gray-400 px-1 hover:text-white transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDate(date);
                              }}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  setSelectedDate(date);
                                }
                              }}
                            >
                              +{dayBlocks.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                }}
              />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="border-wood">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-foreground">
                Schedule for {selectedDate ? selectedDate.toDateString() : "Select a Date"}
              </CardTitle>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Add Block</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Booking Block</DialogTitle>
                    <DialogDescription>
                      Enter the details for your booking.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddBlock} className="space-y-4">
                    <div className="flex flex-col">
                      <label className="mb-1 text-sm font-medium">Title</label>
                      <Input
                        type="text"
                        placeholder="Meeting title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-1 text-sm font-medium">Start Time</label>
                      <Input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-1 text-sm font-medium">End Time</label>
                      <Input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-1 text-sm font-medium">Description</label>
                      <Input
                        type="text"
                        placeholder="Optional description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-1 text-sm font-medium">Color</label>
                      <div className="flex gap-2">
                        {[
                          "bg-blue-400/80 text-white",
                          "bg-green-400/80 text-white",
                          "bg-purple-400/80 text-white",
                          "bg-pink-400/80 text-white",
                          "bg-orange-400/80 text-white",
                          "bg-red-400/80 text-white",
                          "bg-yellow-400/80 text-black",
                          "bg-cyan-400/80 text-white",
                          "bg-indigo-400/80 text-white",
                          "bg-emerald-400/80 text-white"
                        ].map((colorOption) => (
                          <button
                            key={colorOption}
                            type="button"
                            className={`w-6 h-6 rounded-full ${colorOption} ${
                              color === colorOption ? 'ring-2 ring-offset-2 ring-white' : ''
                            } hover:opacity-90 transition-opacity`}
                            onClick={() => setColor(colorOption)}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="sendInvoice"
                        checked={sendInvoice}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSendInvoice(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <label htmlFor="sendInvoice" className="text-sm font-medium">
                        Create and send invoice when marked completed
                      </label>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" type="button" onClick={() => setDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Add</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {blocksForSelectedDate.length > 0 ? (
                  blocksForSelectedDate
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map((block) => (
                      <Card key={block.id} className={`${block.color || 'bg-gray-800'} border-tan`}>
                        <CardHeader className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{block.title}</h3>
                              <p className="text-sm opacity-90">
                                {block.startTime} - {block.endTime}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                        {block.description && (
                          <CardContent className="pt-0 pb-4 px-4">
                            <p className="text-sm opacity-90">{block.description}</p>
                          </CardContent>
                        )}
                      </Card>
                    ))
                ) : (
                  <p className="text-muted-foreground text-center py-8">No bookings for this day.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
