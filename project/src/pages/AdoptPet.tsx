import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';

const pets = [
  {
    id: 1,
    name: 'Max',
    type: 'Dog',
    breed: 'Golden Retriever',
    age: '2 years',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Luna',
    type: 'Cat',
    breed: 'Persian',
    age: '1 year',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80',
  },
  // Add more pets here
];

const AdoptPet = () => {
  const [selectedPet, setSelectedPet] = useState<number | null>(null);

  const handleAdoptClick = (petId: number) => {
    setSelectedPet(petId);
    toast.success('Thank you for your interest! We will contact you soon.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Pets for Adoption</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <div key={pet.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{pet.name}</h3>
              <p className="text-gray-600 mb-2">{pet.breed}</p>
              <p className="text-gray-600 mb-4">{pet.age}</p>
              <button
                onClick={() => handleAdoptClick(pet.id)}
                className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center justify-center space-x-2"
              >
                <Heart className="h-5 w-5" />
                <span>Adopt {pet.name}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdoptPet;