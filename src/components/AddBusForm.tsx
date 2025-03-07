import React, { useState, useEffect } from 'react';
import { Bus, Counter } from '../types/bus';

interface AddBusFormProps {
  onSubmit: (bus: Omit<Bus, 'id'>) => void;
  editBus?: Bus;
  onCancel?: () => void;
}

export const AddBusForm: React.FC<AddBusFormProps> = ({ onSubmit, editBus, onCancel }) => {
  const [counters, setCounters] = useState<Counter[]>([{ name: '', place: '', phone: '' }]);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    from: 'Sherpur',
    to: '',
    departureTime: '',
    arrivalTime: '',
    returnDepartureTime: '',
    returnArrivalTime: '',
    type: 'AC' as 'AC' | 'NON-AC',
    supervisorNumber: '',
    route: 'SHERPUR_TO_DHAKA' as Bus['route']
  });

  useEffect(() => {
    if (editBus) {
      setFormData({
        name: editBus.name,
        image: editBus.image,
        from: editBus.from,
        to: editBus.to,
        departureTime: editBus.departureTime,
        arrivalTime: editBus.arrivalTime,
        returnDepartureTime: editBus.returnDepartureTime,
        returnArrivalTime: editBus.returnArrivalTime,
        type: editBus.type,
        supervisorNumber: editBus.supervisorNumber,
        route: editBus.route
      });
      setCounters(editBus.counters);
    }
  }, [editBus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      counters
    });
  };

  const addCounter = () => {
    setCounters([...counters, { name: '', place: '', phone: '' }]);
  };

  const removeCounter = (index: number) => {
    setCounters(counters.filter((_, i) => i !== index));
  };

  // Update 'to' field based on route selection
  useEffect(() => {
    if (formData.route === 'SHERPUR_TO_DHAKA') {
      setFormData(prev => ({ ...prev, from: 'Sherpur', to: 'Dhaka' }));
    } else if (formData.route === 'DHAKA_TO_SHERPUR') {
      setFormData(prev => ({ ...prev, from: 'Dhaka', to: 'Sherpur' }));
    } else if (formData.route === 'SHERPUR_TO_OTHER') {
      setFormData(prev => ({ ...prev, from: 'Sherpur', to: '' }));
    }
  }, [formData.route]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">{editBus ? 'Edit Bus' : 'Add New Bus'}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Bus Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image Path</label>
          <input
            type="file"
            accept="image/*"
            className="mt-1 block w-full"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setFormData({ ...formData, image: reader.result as string });
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Route Type</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.route}
            onChange={(e) => setFormData({ ...formData, route: e.target.value as Bus['route'] })}
          >
            <option value="SHERPUR_TO_DHAKA">Sherpur to Dhaka</option>
            <option value="DHAKA_TO_SHERPUR">Dhaka to Sherpur</option>
            <option value="SHERPUR_TO_OTHER">Sherpur to Other</option>
          </select>
        </div>

        {formData.route === 'SHERPUR_TO_OTHER' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Destination</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.to}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              placeholder="Enter destination"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">From {formData.from} Departure Time</label>
          <input
            type="time"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.departureTime}
            onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">At {formData.to} Arrival Time</label>
          <input
            type="time"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.arrivalTime}
            onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">From {formData.to} Return Time</label>
          <input
            type="time"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.returnDepartureTime}
            onChange={(e) => setFormData({ ...formData, returnDepartureTime: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">At {formData.from} Return Time</label>
          <input
            type="time"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.returnArrivalTime}
            onChange={(e) => setFormData({ ...formData, returnArrivalTime: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bus Type</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as 'AC' | 'NON-AC' })}
          >
            <option value="AC">AC</option>
            <option value="NON-AC">NON-AC</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Supervisor Number</label>
          <input
            type="tel"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.supervisorNumber}
            onChange={(e) => setFormData({ ...formData, supervisorNumber: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Counters</h3>
          <button
            type="button"
            onClick={addCounter}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Counter
          </button>
        </div>

        {counters.map((counter, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-md">
            <div>
              <label className="block text-sm font-medium text-gray-700">Counter Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={counter.name}
                onChange={(e) => {
                  const newCounters = [...counters];
                  newCounters[index].name = e.target.value;
                  setCounters(newCounters);
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Place</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={counter.place}
                onChange={(e) => {
                  const newCounters = [...counters];
                  newCounters[index].place = e.target.value;
                  setCounters(newCounters);
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={counter.phone}
                onChange={(e) => {
                  const newCounters = [...counters];
                  newCounters[index].phone = e.target.value;
                  setCounters(newCounters);
                }}
              />
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={() => removeCounter(index)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          {editBus ? 'Update Bus' : 'Add Bus'}
        </button>
      </div>
    </form>
  );
};