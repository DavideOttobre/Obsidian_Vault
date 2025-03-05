import React, { useEffect, useState } from 'react';
import { UserPlus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { operatoriAPI, responsabiliAPI } from '../lib/api';
import EmployeeForm from '../components/EmployeeForm';

// Definizione dei tipi per il nuovo sistema
interface BaseEmployee {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  createdAt: string;
}

type Responsabile = BaseEmployee;
type Operatore = BaseEmployee;

function Employees() {
  const [activeTab, setActiveTab] = useState<'managers' | 'operators'>('managers');
  const [managers, setManagers] = useState<Responsabile[]>([]);
  const [operators, setOperators] = useState<Operatore[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Responsabile | Operatore | undefined>();

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      
      // Fetch managers
      const managersData = await responsabiliAPI.getAll();
      setManagers(managersData || []);

      // Fetch operators
      const operatorsData = await operatoriAPI.getAll();
      setOperators(operatorsData || []);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Errore nel caricamento dei dipendenti';
      toast.error(errorMessage);
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id: string, type: 'manager' | 'operator') => {
    if (!confirm('Sei sicuro di voler eliminare questo dipendente?')) return;

    try {
      if (type === 'manager') {
        await responsabiliAPI.delete(id);
      } else {
        await operatoriAPI.delete(id);
      }
      
      toast.success('Dipendente eliminato con successo');
      fetchEmployees();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Errore durante l\'eliminazione';
      toast.error(errorMessage);
      console.error('Delete error:', error);
    }
  };

  const handleEdit = (employee: Responsabile | Operatore) => {
    setSelectedEmployee(employee);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    fetchEmployees();
    setSelectedEmployee(undefined);
  };

  const handleNewEmployee = () => {
    setSelectedEmployee(undefined);
    setShowForm(true);
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Dipendenti</h1>
          <p className="mt-2 text-sm text-gray-700">
            Gestisci i responsabili e gli operatori del sistema.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={handleNewEmployee}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Nuovo dipendente
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('managers')}
            className={`${
              activeTab === 'managers'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            Responsabili
            <span className={`${
              activeTab === 'managers' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-900'
            } ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block`}>
              {managers.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('operators')}
            className={`${
              activeTab === 'operators'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            Operatori
            <span className={`${
              activeTab === 'operators' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-900'
            } ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block`}>
              {operators.length}
            </span>
          </button>
        </nav>
      </div>
      
      {/* Table */}
      <div className="mt-8 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                      Nome
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Cognome
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Data creazione
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4">
                      <span className="sr-only">Azioni</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-gray-500">
                        Caricamento...
                      </td>
                    </tr>
                  ) : activeTab === 'managers' ? (
                    managers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-4 text-gray-500">
                          Nessun responsabile trovato
                        </td>
                      </tr>
                    ) : (
                      managers.map((manager) => (
                        <tr key={manager.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                            {manager.nome}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            {manager.cognome}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {manager.email}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Date(manager.createdAt).toLocaleDateString()}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                            <button
                              onClick={() => handleEdit(manager)}
                              className="text-indigo-600 hover:text-indigo-900 mr-4"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(manager.id, 'manager')}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )
                  ) : (
                    operators.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-4 text-gray-500">
                          Nessun operatore trovato
                        </td>
                      </tr>
                    ) : (
                      operators.map((operator) => (
                        <tr key={operator.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                            {operator.nome}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            {operator.cognome}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {operator.email}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Date(operator.createdAt).toLocaleDateString()}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                            <button
                              onClick={() => handleEdit(operator)}
                              className="text-indigo-600 hover:text-indigo-900 mr-4"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(operator.id, 'operator')}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <EmployeeForm
          type={activeTab === 'managers' ? 'responsabili' : 'operatori'}
          employee={selectedEmployee}
          onClose={() => {
            setShowForm(false);
            setSelectedEmployee(undefined);
          }}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}

export default Employees;
