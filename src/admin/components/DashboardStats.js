import React, {useEffect}from 'react';
import { FiPackage, FiDollarSign, FiTrendingUp, FiUsers } from 'react-icons/fi';
// import { allProducts } from '../../constants';
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsAdmin } from '../../actions/productAction';

const DashboardStats = () => {
    const dispatch = useDispatch();
  
  let allProducts = useSelector((state) => state.productsAdmin.productsAll)
  const productCount = useSelector((state) => state.productsAdmin.productsCount)

  // Use real data from Redux store
  const displayProducts = allProducts || [];

  useEffect(() => {
    dispatch(getAllProductsAdmin());
  }, [dispatch]);

  const totalValue = displayProducts && displayProducts.reduce((sum, product) => sum + parseInt(product.price || 0), 0);
  const averagePrice = totalValue / (productCount || displayProducts.length);

  const stats = [
    {
      title: 'Total Products',
      value: productCount || displayProducts.length,
      icon: FiPackage,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Total Value',
      value: `₹${totalValue && totalValue.toLocaleString()}`,
      icon: FiDollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Average Price',
      value: `₹${Math.round(averagePrice).toLocaleString()}`,
      icon: FiTrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Total Orders',
      value: 0, // Will be updated when orders API is implemented
      icon: FiUsers,
      color: 'text-[#D4A574]',
      bgColor: 'bg-[#D4A574]/10',
      change: '+0',
      changeType: 'positive'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-beige rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <div className="flex items-center mt-2">
                <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
