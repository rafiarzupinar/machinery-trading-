"use client";

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { deleteMachine } from '@/actions/machines';

export default function DeleteMachineButton({ id }: { id: string }) {
      const [loading, setLoading] = useState(false);

      const handleDelete = async () => {
            if (confirm('Are you sure you want to delete this machine?')) {
                  setLoading(true);
                  try {
                        await deleteMachine(id);
                  } catch (error) {
                        console.error('Failed to delete machine:', error);
                        alert('Failed to delete machine');
                  } finally {
                        setLoading(false);
                  }
            }
      };

      return (
            <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="text-red-600 hover:text-red-900 disabled:opacity-50"
                  title="Delete"
            >
                  <Trash2 size={18} />
            </button>
      );
}
