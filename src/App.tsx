import React, { useState } from 'react';
import { Bus, RouteFilter } from './types/bus';
import { BusCard } from './components/BusCard';
import { AddBusForm } from './components/AddBusForm';
import { Footer } from './components/Footer';
import { Search, Filter, Bus as BusIcon } from 'lucide-react';
import busData from './data/buses.json';

function App() {
  const [buses, setBuses] = useState<Bus[]>(busData.buses);
  const [routeFilter, setRouteFilter] = useState<RouteFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBus, setEditingBus] = useState<Bus | undefined>(undefined);

  const filteredBuses = buses
    .filter(bus => {
      if (routeFilter === 'ALL') return true;
      return bus.route === routeFilter;
    })
    .filter(bus => {
      const query = searchQuery.toLowerCase();
      return (
        bus.name.toLowerCase().includes(query) ||
        bus.counters.some(counter => 
          counter.name.toLowerCase().includes(query) ||
          counter.place.toLowerCase().includes(query)
        )
      );
    })
    .sort((a, b) => a.departureTime.localeCompare(b.departureTime));

  const handleAddBus = (newBus: Omit<Bus, 'id'>) => {
    if (editingBus) {
      setBuses(buses.map(bus => 
        bus.id === editingBus.id ? { ...newBus, id: bus.id } : bus
      ));
      setEditingBus(undefined);
    } else {
      const bus: Bus = {
        ...newBus,
        id: (buses.length + 1).toString()
      };
      setBuses([...buses, bus]);
    }
    setShowAddForm(false);
  };

  const handleEditBus = (bus: Bus) => {
    setEditingBus(bus);
    setShowAddForm(true);
  };

  const handleDeleteBus = (id: string) => {
    if (window.confirm('Are you sure you want to delete this bus?')) {
      setBuses(buses.filter(bus => bus.id !== id));
    }
  };

  const handleCancel = () => {
    setEditingBus(undefined);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <BusIcon size={32} />
              <h1 className="text-3xl font-bold">Sherpur Bus</h1>
            </div>
            <button
              onClick={() => {
                setShowAddForm(!showAddForm);
                setEditingBus(undefined);
              }}
              className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50"
            >
              {showAddForm ? 'View Buses' : 'Add New Bus'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {showAddForm ? (
          <AddBusForm 
            onSubmit={handleAddBus} 
            editBus={editingBus}
            onCancel={handleCancel}
          />
        ) : (
          <>
            <div className="mb-8 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search by bus name or counter..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Filter size={20} className="text-gray-500" />
                  <select
                    className="rounded-lg border p-2 focus:ring-2 focus:ring-blue-500"
                    value={routeFilter}
                    onChange={(e) => setRouteFilter(e.target.value as RouteFilter)}
                  >
                    <option value="ALL">All Routes</option>
                    <option value="SHERPUR_TO_DHAKA">Sherpur to Dhaka</option>
                    <option value="DHAKA_TO_SHERPUR">Dhaka to Sherpur</option>
                    <option value="SHERPUR_TO_OTHER">Sherpur to Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBuses.map(bus => (
                <BusCard 
                  key={bus.id} 
                  bus={bus} 
                  onEdit={handleEditBus}
                  onDelete={handleDeleteBus}
                />
              ))}
            </div>

            {filteredBuses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No buses found matching your criteria.</p>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;