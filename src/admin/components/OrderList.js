import React, { useState, useMemo, useEffect } from 'react';
import { FiSearch, FiEye, FiEdit, FiCheck, FiX } from 'react-icons/fi';
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders, getOrderDetails } from '../../actions/orderAction';
import Modal from './common/Modal';

const OrderList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [orderToUpdate, setOrderToUpdate] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  
  const dispatch = useDispatch();
  
  const { orders = [], loading = false, error = null } = useSelector((state) => state.allOrders || {});
  const { loading: orderDetailsLoading = false } = useSelector((state) => state.orderDetails || {});

  // Use real data from Redux store
  const displayOrders = orders || [];

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  // Get unique statuses for filter
  const statuses = useMemo(() => {
    if (!displayOrders || displayOrders.length === 0) return [];
    const uniqueStatuses = [...new Set(displayOrders.map(order => order.orderStatus))];
    return uniqueStatuses.map(status => ({ label: status, value: status }));
  }, [displayOrders]);

  // Filter and sort orders
  const filteredOrders = useMemo(() => {
    if (!displayOrders || displayOrders.length === 0) return [];
    
    let filtered = displayOrders.filter(order => {
      const matchesSearch = 
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = !filterStatus || order.orderStatus === filterStatus;
      
      return matchesSearch && matchesStatus;
    });

    // Sort orders
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'createdAt':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        case 'totalPrice':
          aValue = a.totalPrice;
          bValue = b.totalPrice;
          break;
        case 'orderStatus':
          aValue = a.orderStatus;
          bValue = b.orderStatus;
          break;
        default:
          aValue = a[sortBy];
          bValue = b[sortBy];
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [displayOrders, searchTerm, filterStatus, sortBy, sortOrder]);

  const handleViewOrder = async (orderId) => {
    // Find the order in the orders list
    const order = displayOrders.find(o => o._id === orderId);
    
    if (order) {
      setSelectedOrder(order);
      setIsModalOpen(true);
    } else {
      // For real API data
      setSelectedOrder(null);
      dispatch(getOrderDetails(orderId));
      setIsModalOpen(true);
    }
  };

  const handleUpdateOrder = (order) => {
    setOrderToUpdate(order);
    setNewStatus(order.orderStatus);
    setIsUpdateModalOpen(true);
  };

  const handleStatusUpdate = () => {
    if (orderToUpdate && newStatus) {
      // In a real app, this would dispatch an action to update the order
      console.log(`Updating order ${orderToUpdate._id} to status: ${newStatus}`);
      // Close the modal after status update
      setIsUpdateModalOpen(false);
      setOrderToUpdate(null);
      setNewStatus('');
    }
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setOrderToUpdate(null);
    setNewStatus('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4A574]"></div>
    </div>
  );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading orders: {error}</p>
        </div>
  );
  }

  return (
    <div className="w-full h-full bg-gray-100 rounded-[1rem] p-[1rem] overflow-y-auto">
      <div className="max-w-7xl mx-auto">
      {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
          <p className="text-gray-600">Manage and track customer orders</p>
      </div>

      {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-[#D4A574]"
              />
          </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-[#D4A574]"
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-[#D4A574]"
            >
              <option value="createdAt">Sort by Date</option>
              <option value="totalPrice">Sort by Amount</option>
              <option value="orderStatus">Sort by Status</option>
            </select>

            {/* Sort Order */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-[#D4A574]"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
        </div>
      </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          #{order._id.slice(-8)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.user?.name || 'N/A'}</div>
                        <div className="text-sm text-gray-500">{order.user?.email || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.orderItems?.length || 0} items
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ₹{order.totalPrice?.toLocaleString() || '0'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewOrder(order._id)}
                            className="p-2 text-[#D4A574] hover:text-[#C08860] hover:bg-[#D4A574]/10 rounded-lg transition-all duration-200"
                            title="View Order Details"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleUpdateOrder(order)}
                            className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                            title="Update Order Status"
                          >
                            <FiEdit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Modal */}
        <Modal
          isVisible={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedOrder(null);
          }}
        >
          {orderDetailsLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4A574]"></div>
            </div>
          ) : selectedOrder ? (
            <div className="space-y-8 pb-8">
              {/* Header Section */}
              <div className="text-center border-b border-gray-200 pb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Details</h2>
                <p className="text-gray-600">Complete order information and customer details</p>
              </div>

              {/* Order Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">#</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-600">Order ID</p>
                      <p className="text-lg font-bold text-blue-900">#{selectedOrder._id.slice(-8)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">₹</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-yellow-600">Total Amount</p>
                      <p className="text-lg font-bold text-yellow-900">₹{selectedOrder.totalPrice?.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">📦</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-600">Items</p>
                      <p className="text-lg font-bold text-green-900">{selectedOrder.orderItems?.length || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">📅</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-purple-600">Order Date</p>
                      <p className="text-sm font-bold text-purple-900">{formatDate(selectedOrder.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-center">
                <span className={`inline-flex items-center px-6 py-3 text-lg font-semibold rounded-full ${getStatusColor(selectedOrder.orderStatus)} shadow-lg`}>
                  {selectedOrder.orderStatus}
                </span>
              </div>

              {/* Customer Information */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#D4A574] to-[#C08860] px-6 py-4">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <span className="mr-3">👤</span>
                    Customer Information
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Full Name</p>
                      <p className="text-lg font-semibold text-gray-900">{selectedOrder.user?.name || 'N/A'}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Email Address</p>
                      <p className="text-lg font-semibold text-gray-900">{selectedOrder.user?.email || 'N/A'}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Phone Number</p>
                      <p className="text-lg font-semibold text-gray-900">{selectedOrder.shippingInfo?.phoneNo || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <span className="mr-3">📍</span>
                    Shipping Address
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Street Address</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedOrder.shippingInfo?.address || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">City</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedOrder.shippingInfo?.city || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">State & Pin Code</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {selectedOrder.shippingInfo?.state || 'N/A'}, {selectedOrder.shippingInfo?.pinCode || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Country</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedOrder.shippingInfo?.country || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <span className="mr-3">🛍️</span>
                    Order Items
                  </h3>
                </div>
          <div className="p-6">
                  <div className="space-y-4">
                    {selectedOrder.orderItems?.map((item, index) => (
                      <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h4>
                            <div className="flex space-x-6 text-sm text-gray-600">
                              <span className="flex items-center">
                                <span className="font-medium">Quantity:</span>
                                <span className="ml-2 bg-[#D4A574] text-white px-2 py-1 rounded-full text-xs font-bold">
                                  {item.quantity}
                                </span>
                              </span>
                              <span className="flex items-center">
                                <span className="font-medium">Unit Price:</span>
                                <span className="ml-2 font-bold text-gray-900">₹{item.price?.toLocaleString()}</span>
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-[#D4A574]">
                              ₹{(item.price * item.quantity)?.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">Item Total</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Order Summary */}
                  <div className="mt-8 bg-gradient-to-r from-[#D4A574] to-[#C08860] p-6 rounded-xl text-white">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">Order Total</span>
                      <span className="text-3xl font-bold">₹{selectedOrder.totalPrice?.toLocaleString()}</span>
                    </div>
                    <p className="text-sm opacity-90 mt-2">Including all items and applicable taxes</p>
                  </div>
                </div>
            </div>
          </div>
          ) : (
            <p className="text-gray-500">No order details available</p>
          )}
        </Modal>

        {/* Update Order Status Modal */}
        <Modal
          isVisible={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
        >
          {orderToUpdate && (
            <div className="space-y-8 pb-8">
              {/* Header */}
              <div className="text-center border-b border-gray-200 pb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Update Order Status</h2>
                <p className="text-gray-600">Change the current status of this order</p>
              </div>

              {/* Order Info Card */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-3">📋</span>
                  Order Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">Order ID</p>
                    <p className="text-lg font-bold text-gray-900">#{orderToUpdate._id.slice(-8)}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">Customer</p>
                    <p className="text-lg font-bold text-gray-900">{orderToUpdate.user?.name}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">Current Status</p>
                    <span className={`inline-flex px-3 py-2 text-sm font-semibold rounded-full ${getStatusColor(orderToUpdate.orderStatus)}`}>
                      {orderToUpdate.orderStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Update Section */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#D4A574] to-[#C08860] px-6 py-4">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <span className="mr-3">🔄</span>
                    Update Status
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Select New Status
                      </label>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D4A574] focus:border-[#D4A574] transition-all duration-200 text-lg font-medium"
                      >
                        <option value="Processing">🔄 Processing</option>
                        <option value="Shipped">🚚 Shipped</option>
                        <option value="Delivered">✅ Delivered</option>
                        <option value="Cancelled">❌ Cancelled</option>
                      </select>
                    </div>
                    
                    {/* Status Preview */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-500 mb-2">Status Preview</p>
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex px-4 py-2 text-lg font-semibold rounded-full ${getStatusColor(newStatus)}`}>
                          {newStatus}
                        </span>
                        <span className="text-sm text-gray-500">
                          {newStatus === orderToUpdate.orderStatus ? '(No change)' : 'New status'}
                        </span>
                      </div>
                    </div>
                  </div>
            </div>
          </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleStatusUpdate}
                  className="flex-1 bg-gradient-to-r from-[#D4A574] to-[#C08860] text-white px-6 py-4 rounded-xl hover:from-[#C08860] hover:to-[#B07A50] transition-all duration-200 font-semibold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FiCheck className="w-5 h-5" />
                  Update Status
                </button>
                <button
                  onClick={handleCloseUpdateModal}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-4 rounded-xl hover:bg-gray-300 transition-all duration-200 font-semibold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                  <FiX className="w-5 h-5" />
                  Cancel
                </button>
            </div>
          </div>
        )}
        </Modal>
      </div>
    </div>
  );
};

export default OrderList;