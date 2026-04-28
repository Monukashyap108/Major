import React from "react";
import { bookingData } from "../assets/assets";
import {
  MapPin,
  Calendar,
  Users,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Trash2,
  User,
  Home,
} from "lucide-react";

export default function MyBooking() {
  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "text-green-600 bg-green-50";
      case "Cancelled":
        return "text-red-600 bg-red-50";
      case "Pending":
        return "text-yellow-600 bg-yellow-50";
      case "Completed":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };
  const getStatusTextColor = (Status) => {
    switch (Status) {
      case "Confirmed":
        return "text-green-600";
      case "Cancelled":
        return "text-red-600";
      case "Pending":
        return "text-yellow-600";
      case "Completed":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case "Confirmed":
        return <CheckCircle />;
      case "Cancelled":
        return <XCircle />;
      case "Pending":
        return <Clock />;
      case "Completed":
        return <CheckCircle />;
      default:
        return <Clock />;
    }
  };
  return (
    <div className="min-h-screen bg-gray-50  py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* header
         */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">My Bookings</h1>
          <p>
            {" "}
            Here are your hotel bookings . you can view details and manage your
            reservations.
          </p>
        </div>
        {/* booking list  */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* desktop heading */}
          <div
            className="hidden md:grid md:grid-cols-12 bg-gray-50 px-6 py-4 border-b
              border-gray-200 font-semibold text-gray-700"
          >
            <div className="col-span-4">Hotel & Room</div>
            <div className="col-span-3">Dates</div>
            <div className="col-span-3">Payment</div>
            <div className="col-span-2">Actions</div>
          </div>
          <div className="divide-y divide-gray-100">
            {bookingData.map((booking) => {
              const statusIcon = getStatusIcon(booking.status);
              return (
                <div
                  key={booking._id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start
                      md:items-center"
                  >
                    {/* hotels and room info
                     */}
                    <div className="col-span-1 md:col-span-4 ">
                      <div className="flex gap-4">
                        <img
                          src={booking.room.images[0]}
                          alt={booking.room.roomType}
                          className="w-20 h-16 md:w-24 md:h-29 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 text-lg mb-1">
                            {booking.hotel.name}
                          </h3>
                          <p className="text-blue-600 font-medium mb-1">
                            {booking.room.roomType}
                          </p>
                          <div className="flex items-center gap-1 text-gray-500 text-semibold mb-1">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">
                              {booking.hotel.address}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500 text-semibold">
                            <User className="h-3 w-3" />
                            <span>
                              {booking.guest}guest
                              {booking.guest > 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* dates */}
                    <div className="col-span-1 md:col-span-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-800" />
                          <div>
                            <p className="text-sm text-gray-800">Check-In</p>
                            <p className="font-medium text-gray-400">
                              {new Date(booking.checkInDate).toLocaleDateString(
                                "en-Us",
                                {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1 md:col-span-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-800" />
                            <div>
                              <p className="text-sm text-gray-800">Check-Out</p>
                              <p className="font-medium text-gray-400">
                                {new Date(
                                  booking.checkOutDate,
                                ).toLocaleDateString("en-Us", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* payments */}
                    <div className="col-span-1 md:col-span-2">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {booking.paymentMethod}
                          </span>
                        </div>
                        <p className="font-bold text-lg text-gray-800">
                          {booking.totalPrice}
                        </p>
                        <div
                          className={`inline-flex items-center gap-2 px-2 py-1 rounded- text-xs font-medium${
                            booking.isPaid
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {booking.isPaid ? "Paid" : "UnPaid"}
                        </div>
                      </div>
                    </div>
                    {/* status */}
                    <div className="col-span-1 md:col-span-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${getStatusColor(booking.status)}`}
                        ></div>
                        <statusIcon
                          className={`w-4 h-4 ${getStatusTextColor(booking.status)} `}
                        />
                        <span
                          className={`font-medium capitalize ${getStatusTextColor(booking.status)}`}
                        >{booking.status}</span>
                      </div>
                    </div>
              
                  {/* Actions */}
                  <div className="col-span-1 md:col-span-1">
                    <div className="flex   gap-2">
                      {booking.status !== "canclled" && (
                        <button
                          onClick={""}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title=" cancle Booking"
                        >
                          <Trash2 className="w-3 h-3 " /> 
                          
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
