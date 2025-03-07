import React from 'react';
import { Bus } from '../types/bus';
import { Clock, MapPin, Phone, Edit, Trash2 } from 'lucide-react';

interface BusCardProps {
  bus: Bus;
  onEdit: (bus: Bus) => void;
  onDelete: (id: string) => void;
}

export const BusCard: React.FC<BusCardProps> = ({ bus, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img 
        src={bus.image} 
        alt={bus.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{bus.name}</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(bus)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
            >
              <Edit size={20} />
            </button>
            <button
              onClick={() => onDelete(bus.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold mb-2 text-green-600">From {bus.from}</h3>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Clock className="text-gray-500" size={20} />
                <span className="text-gray-600">Departure:</span>
              </div>
              <span className="font-semibold">{bus.departureTime}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center space-x-2">
                <Clock className="text-gray-500" size={20} />
                <span className="text-gray-600">Arrival at {bus.to}:</span>
              </div>
              <span className="font-semibold">{bus.arrivalTime}</span>
            </div>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold mb-2 text-green-600">Return from {bus.to}</h3>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Clock className="text-gray-500" size={20} />
                <span className="text-gray-600">Departure:</span>
              </div>
              <span className="font-semibold">{bus.returnDepartureTime}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center space-x-2">
                <Clock className="text-gray-500" size={20} />
                <span className="text-gray-600">Arrival at {bus.from}:</span>
              </div>
              <span className="font-semibold">{bus.returnArrivalTime}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <MapPin className="text-gray-500" size={20} />
              <span className="text-gray-600">Route:</span>
            </div>
            <span className="font-semibold">{bus.from} → {bus.to}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Type:</span>
            <span className={`px-3 py-1 rounded-full ${
              bus.type === 'AC' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            }`}>
              {bus.type}
            </span>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2 text-purple-600">Supervisor</h3>
            <div className="flex items-center space-x-2">
              <Phone size={16} className="text-purple-500" />
              <span>{bus.supervisorNumber}</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2 text-blue-600">Counters</h3>
            {bus.counters.map((counter, index) => (
              <div key={index} className="mb-2">
                <div className="text-blue-600 font-medium">{counter.name}</div>
                <div className="text-blue-600">{counter.place}</div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-blue-500" />
                  <span>{counter.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};