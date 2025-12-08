import api from './configAxios'

export async function getCertificados(voluntarioId) {
  try {
    const response = await api.get(`/voluntarios/${voluntarioId}/certificados`);
    return response.data; // expecting an array
  } catch (error) {
    console.error('Erro ao carregar certificados:', error);
    throw new Error(error.response?.data?.message || 'Erro ao carregar certificados');
  }
}

export async function adicionarCertificado(voluntarioId, data) {
  try {
    const response = await api.post(`/voluntarios/${voluntarioId}/certificados`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar certificado:', error);
    throw new Error(error.response?.data?.message || 'Erro ao adicionar certificado');
  }
}

export async function atualizarCertificado(voluntarioId, certificadoId, data) {
  try {
    const response = await api.put(`/voluntarios/${voluntarioId}/certificados/${certificadoId}`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar certificado:', error);
    throw new Error(error.response?.data?.message || 'Erro ao atualizar certificado');
  }
}

export async function deletarCertificado(voluntarioId, certificadoId) {
  try {
    const response = await api.delete(`/voluntarios/${voluntarioId}/certificados/${certificadoId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar certificado:', error);
    throw new Error(error.response?.data?.message || 'Erro ao deletar certificado');
  }
}
