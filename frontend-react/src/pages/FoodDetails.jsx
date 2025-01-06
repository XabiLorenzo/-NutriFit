import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FoodDetails.css';

const FoodDetails = () => {
  const { id } = useParams(); // Obtén el ID del alimento desde la URL
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        //http://127.0.0.1:8000/foods/${id}
        const response = await fetch(`http://localhost:8000/foods/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener los detalles del alimento');
        }
        const data = await response.json();
        setFood(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodDetails();
  }, [id]);

  if (loading) return <p>Cargando detalles del alimento...</p>;
  if (errorMessage) return <p>{errorMessage}</p>;

  return (
    <div className="food-details-container">
      <button className="back-button" onClick={() => navigate('/home')}>
        Volver
      </button>
      <h1>{food.name}</h1>
      <p><strong>Descripción:</strong> {food.description}</p>
      <p><strong>Tipo:</strong> {food.type}</p>
      <p><strong>Cantidad:</strong> {food.quantity} {food.quantity_unit}</p>
      <p><strong>Calorías:</strong> {food.calories}</p>
      <p><strong>Proteínas:</strong> {food.protein}g</p>
      <p><strong>Carbohidratos:</strong> {food.carbs}g</p>
      <p><strong>Grasas:</strong> {food.fat}g</p>
      <p><strong>Azúcar:</strong> {food.sugar}g</p>
      <p><strong>Fibra:</strong> {food.fiber}g</p>
      <p><strong>Sodio:</strong> {food.sodium}mg</p>
      <p><strong>Fuente:</strong> <a href={food.source_url} target="_blank" rel="noopener noreferrer">Ver fuente</a></p>
    </div>
  );
};

export default FoodDetails;
