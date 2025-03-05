import React, { useEffect, useState } from 'react';
import { UserPlus, Pencil, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { toast } from 'react-hot-toast';
import EmployeeForm from '../../components/EmployeeForm';
import type { Database } from '../../lib/database.types';

type Operatore = Database['public']['Tables']['operatori']['Row'];

function Operators() {
  const [operators, setOperators] = useState<Operatore[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState<Operatore | undefined>();

  const fetchOperators = async () => {
    try {
      const { data, error } = await supabase
        .from('operatori')
        .select('*')
        .order('cognome', { ascending: true });
      
      if (error) throw error;
      setOperators(data || []);
    } catch (error: any) {
      toast.error('Errore nel caricamento degli operatori');
      console.error('Error fetching operators:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOperators();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo operatore?')) return;

    try {
      const { error } = await supabase
        .from('operatori')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Operatore eliminato con successo');
      fetchOperators();
    } catch (error: any) {
      toast.error('Errore durante l\'eliminazione');
      console.error('Delete error:', error);
    }
  };

  const handleEdit = (operator: Operatore) => {
    setSelectedOperator(operator);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    fetchOperators();
    setSelectedOperator(undefined);
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Operatori</h1>
          <p className="mt-2 text-sm text-gray-700">
            Gestisci l'elenco degli operatori nel sistema.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Nuovo operatore
          </button>
        </div>
      </div>

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
                  ) : operators.length === 0 ? (
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
                          {new Date(operator.created_at).toLocaleDateString()}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(operator)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(operator.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <EmployeeForm
          type="operatori"
          employee={selectedOperator}
          onClose={() => {
            setShowForm(false);
            setSelectedOperator(undefined);
          }}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}

export default Operators;