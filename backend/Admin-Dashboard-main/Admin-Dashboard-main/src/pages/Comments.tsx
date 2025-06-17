import React, { useState } from 'react';
import { Search, Filter, MessageCircle, Eye, Check, X, Trash2 } from 'lucide-react';

const mockComments = [
  {
    id: '1',
    content: 'Cette recette est absolument délicieuse ! J\'ai suivi toutes les étapes et le résultat était parfait.',
    author: 'Marie Dubois',
    recipe: 'Coq au Vin Moderne',
    status: 'pending',
    createdAt: '2024-01-20',
    rating: 5,
  },
  {
    id: '2',
    content: 'Très bon mais j\'ai trouvé que la cuisson était un peu longue.',
    author: 'Jean Martin',
    recipe: 'Ratatouille Provençale',
    status: 'approved',
    createdAt: '2024-01-19',
    rating: 4,
  },
  {
    id: '3',
    content: 'Recette décevante, les proportions ne sont pas bonnes.',
    author: 'Pierre Moreau',
    recipe: 'Bouillabaisse Traditionnelle',
    status: 'flagged',
    createdAt: '2024-01-18',
    rating: 2,
  },
];

export function Comments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredComments = mockComments.filter(comment => {
    const matchesSearch = comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.recipe.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || comment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      approved: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      flagged: 'bg-red-100 text-red-800 border-red-200',
      rejected: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Comments</h1>
          <p className="text-gray-600 mt-2">Moderate user comments and reviews</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Pending:</span>
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm font-medium">
            {mockComments.filter(c => c.status === 'pending').length}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search comments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="flagged">Flagged</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.map((comment) => (
          <div key={comment.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="font-medium text-gray-900">{comment.author}</div>
                  <div className="text-sm text-gray-500">commented on</div>
                  <div className="font-medium text-purple-600">{comment.recipe}</div>
                  <div className="flex items-center">
                    {renderStars(comment.rating)}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">{comment.content}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(comment.status)}`}>
                      {comment.status}
                    </span>
                    <span className="text-sm text-gray-500">{comment.createdAt}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 p-2 rounded hover:bg-blue-50 transition-colors duration-150">
                      <Eye className="h-4 w-4" />
                    </button>
                    {comment.status === 'pending' && (
                      <>
                        <button className="text-green-600 hover:text-green-900 p-2 rounded hover:bg-green-50 transition-colors duration-150">
                          <Check className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-2 rounded hover:bg-red-50 transition-colors duration-150">
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    <button className="text-red-600 hover:text-red-900 p-2 rounded hover:bg-red-50 transition-colors duration-150">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredComments.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No comments found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}