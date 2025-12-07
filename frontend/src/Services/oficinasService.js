import api from './configAxios'

export async function getOficinas(voluntarioId) {
  try {
    const response = await api.get(`/voluntarios/${voluntarioId}/oficinas`);
    return response.data;
  } catch (error) {
    console.error('Erro ao carregar oficinas:', error);
    throw new Error(error.response?.data?.message || 'Erro ao carregar oficinas');
  }
}

export async function getOficina(voluntarioId, oficinaId) {
  try {
    const response = await api.get(`/voluntarios/${voluntarioId}/oficinas/${oficinaId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao carregar oficina:', error);
    throw new Error(error.response?.data?.message || 'Erro ao carregar oficina');
  }
}

export async function adicionarOficina(voluntarioId, data) {
  try {
    const response = await api.post(`/voluntarios/${voluntarioId}/oficinas`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar oficina:', error);
    throw new Error(error.response?.data?.message || 'Erro ao adicionar oficina');
  }
}

export async function atualizarOficina(voluntarioId, oficinaId, data) {
  try {
    const response = await api.put(`/voluntarios/${voluntarioId}/oficinas/${oficinaId}`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar oficina:', error);
    throw new Error(error.response?.data?.message || 'Erro ao atualizar oficina');
  }
}

export async function deletarOficina(voluntarioId, oficinaId) {
  try {
    const response = await api.delete(`/voluntarios/${voluntarioId}/oficinas/${oficinaId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar oficina:', error);
    throw new Error(error.response?.data?.message || 'Erro ao deletar oficina');
  }
}
