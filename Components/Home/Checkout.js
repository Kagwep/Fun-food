import React, {useState} from 'react'
import { View } from 'react-native'

const Checkout = () => {
    const [orders, setOrders] = useState([]);

    const fetchProducts = async () => {

        let url = 'https://funfood.vercel.app/api/orders/';
        if (category) {
          url += `?category=${category}`;
        }
        if (search) {
          url += `?search=${search}`;
        }
        if (order.name) {
          url += `?ordering=${order.name}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setOrders(data);
      }
      

    useEffect(() => {
      fetchProducts();
    }, [category, order,search]);



    

  return (
    <View>

    </View>
  )
}

export default Checkout