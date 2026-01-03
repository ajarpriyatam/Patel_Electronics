import React, { useState, useMemo , useEffect} from 'react';
import { FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';
// import { allProducts } from '../../constants';
import ProductModal from './ProductModal';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsAdmin, deleteProduct, clearDeleteSuccess } from '../../actions/productAction';
import { normalizeCategory, getCategoryContent } from '../../constants/categories';

const ProductsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'edit'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let allProducts = useSelector((state) => state.productsAdmin.productsAll)
  // const productCount = useSelector((state) => state.productsAdmin.productsCount)
  const loading = useSelector((state) => state.productsAdmin.loading)
  const { isDeleted, loading: deleteLoading } = useSelector((state) => state.deleteProduct)

  // Use real data from Redux store
  const displayProducts = allProducts || [];


  useEffect(() => {
    dispatch(getAllProductsAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (isDeleted) {
      dispatch(getAllProductsAdmin()); // Refresh the products list
      dispatch(clearDeleteSuccess()); // Clear the delete success state
    }
  }, [isDeleted, dispatch]);


  // Get unique categories for filter
  const categories = useMemo(() => {
    if (!displayProducts || displayProducts.length === 0) return [];
    const uniqueCategories = [...new Set(displayProducts.map(product => normalizeCategory(product.category)))];
    return uniqueCategories.filter(cat => cat).map(category => ({ 
      label: getCategoryContent(category).title, 
      value: category 
    }));
  }, [displayProducts]);


  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (!displayProducts || displayProducts.length === 0) return [];
    
    let filtered = displayProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const normalizedProductCategory = normalizeCategory(product.category);
      const matchesCategory = !filterCategory || normalizedProductCategory === filterCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'price':
          aValue = parseInt(a.price);
          bValue = parseInt(b.price);
          break;
        case 'category':
          aValue = a.productBrand;
          bValue = b.productBrand;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [displayProducts, searchTerm, filterCategory, sortBy, sortOrder]);

  const handleEdit = (product) => {
    // Navigate to AddProduct page with product data for editing
    navigate('/admin/add/product', { 
      state: { 
        editMode: true, 
        productData: product 
      } 
    });
  };

  const handleDelete = (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
      dispatch(deleteProduct(product._id));
    }
  };

  // const handleView = (product) => {
  //   setSelectedProduct(product);
  //   setModalMode('view');
  //   setIsModalOpen(true);
  // };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setModalMode('view');
  };


  const ProductTableRow = ({ product, index }) => (
    <tr className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-200 border-b border-gray-100">
      <td className="px-6 py-6 whitespace-nowrap">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
            <img
              src={product.productImageGallery[0].url}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/64x64?text=No+Image';
              }}
            />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900 mb-1">
              {product.name.length > 35 ? `${product.name.substring(0, 35)}...` : product.name}
            </div>
            <div className="text-xs text-gray-500">
              {product.productBrand}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-6 whitespace-nowrap">
        <div className="text-lg font-bold text-[#D4A574]">
          ₹{product.price?.toLocaleString()}
        </div>
      </td>
      <td className="px-6 py-6 whitespace-nowrap">
        <div className="flex flex-wrap gap-1.5">
          {product.scent?.slice(0, 2).map((scent, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-[#D4A574]/10 text-[#D4A574] border border-[#D4A574]/20 hover:bg-[#D4A574]/20 transition-colors"
            >
              {scent}
            </span>
          ))}
          {product.scent?.length > 2 && (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200 transition-colors">
              +{product.scent.length - 2}
            </span>
          )}
        </div>
      </td>
      <td className="px-6 py-6 whitespace-nowrap">
        <div className="text-sm font-semibold text-gray-800 bg-gradient-to-r from-[#D4A574]/10 to-[#D4A574]/5 px-3 py-2 rounded-lg border border-[#D4A574]/20">
          {product.category ? getCategoryContent(product.category).title : 'Uncategorized'}
        </div>
      </td>
      <td className="px-6 py-6 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
          {product.tokenId}
        </div>
      </td>
      <td className="px-6 py-6 whitespace-nowrap text-right">
        <div className="flex space-x-3 justify-end">
          <button
            onClick={() => handleEdit(product)}
            className="p-2.5 text-gray-600 hover:text-[#D4A574] hover:bg-[#D4A574]/10 rounded-lg transition-all duration-200 hover:shadow-md"
            title="Edit Product"
          >
            <FiEdit size={18} />
          </button>
          <button
            onClick={() => handleDelete(product)}
            disabled={deleteLoading}
            className="p-2.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete Product"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h2>
          <p className="text-gray-600 text-lg">
            Manage your candle collection ({filteredProducts && filteredProducts.length} products)
          </p>
        </div>
        <div className="mt-6 sm:mt-0">
          <Link to="/admin/add/product">
            <button className="bg-gradient-to-r from-[#D4A574] to-[#C08860] hover:from-[#C08860] hover:to-[#B07A50] text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold flex items-center gap-2">
              <span>+</span>
              Add New Product
            </button>
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D4A574] focus:border-[#D4A574] transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D4A574] focus:border-[#D4A574] transition-all duration-200 bg-gray-50 focus:bg-white"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D4A574] focus:border-[#D4A574] transition-all duration-200 bg-gray-50 focus:bg-white"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="category">Sort by Category</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-[#D4A574]/10 hover:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574] focus:border-[#D4A574] transition-all duration-200 bg-gray-50 hover:bg-white"
            >
              {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
            </button>

          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4A574]"></div>
            <div className="text-gray-600 text-lg mt-4 font-medium">Loading products...</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    scent
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Product ID
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredProducts && filteredProducts.map((product, index) => (
                  <ProductTableRow key={index} product={product} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && filteredProducts && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No products found</div>
            <div className="text-gray-400 text-sm mt-2">
              Try adjusting your search or filter criteria
            </div>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
        mode={modalMode}
      />
    </div>
  );
};

export default ProductsList;
