import jsPDF from 'jspdf';

export const gerarTermoVoluntariado = (voluntario) => {
    const doc = new jsPDF();
    
    // Configurar fonte
    doc.setFont('helvetica');
    
    // Título
    doc.setFontSize(16);
    doc.text('TERMO DE VOLUNTARIADO', 105, 20, { align: 'center' });
    
    // Linha decorativa
    doc.setDrawColor(232, 119, 34);
    doc.setLineWidth(1);
    doc.line(20, 25, 190, 25);
    
    // Espaço
    let yPosition = 35;
    
    // Dados do voluntário
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('DADOS DO VOLUNTÁRIO:', 20, yPosition);
    
    yPosition += 8;
    doc.setFont('helvetica', 'normal');
    
    // Formatação dos dados
    const dados = [
        `Nome: ${voluntario.nome}`,
        `Email: ${voluntario.email}`,
        `CPF: ${voluntario.cpf}`,
        `Data de Nascimento: ${new Date(voluntario.dataNascimento).toLocaleDateString('pt-BR')}`,
        `Curso: ${voluntario.curso}`,
        `Função no Sistema: ${voluntario.funcao}`,
    ];
    
    dados.forEach(dado => {
        doc.text(dado, 25, yPosition);
        yPosition += 7;
    });
    
    // Período de voluntariado
    yPosition += 5;
    doc.setFont('helvetica', 'bold');
    doc.text('PERÍODO DE VOLUNTARIADO:', 20, yPosition);
    
    yPosition += 8;
    doc.setFont('helvetica', 'normal');
    
    const dataInicio = new Date(voluntario.dataInicioVoluntariado).toLocaleDateString('pt-BR');
    const dataFim = voluntario.dataFimVoluntariado 
        ? new Date(voluntario.dataFimVoluntariado).toLocaleDateString('pt-BR')
        : 'Em andamento';
    
    doc.text(`Início: ${dataInicio}`, 25, yPosition);
    yPosition += 7;
    doc.text(`Término: ${dataFim}`, 25, yPosition);
    
    // Termo
    yPosition += 15;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    const textoTermo = `Certifico que ${voluntario.nome} prestou serviços voluntários no projeto "Ensino Lúdico de Lógica de Programação (ELLP)" da Universidade Tecnológica Federal do Paraná (UTFPR), no período de ${dataInicio}${voluntario.dataFimVoluntariado ? ` a ${dataFim}` : ' até o presente momento'}, conforme as normas estabelecidas para atividades voluntárias.`;
    
    // Quebra de linhas automática
    const linhas = doc.splitTextToSize(textoTermo, 160);
    doc.text(linhas, 25, yPosition);
    
    // Espaço para assinatura
    yPosition += linhas.length * 7 + 20;
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(30, yPosition, 80, yPosition);
    
    yPosition += 5;
    doc.setFontSize(10);
    doc.text('_____________________', 30, yPosition, { align: 'center' });
    yPosition += 5;
    doc.text('Assinatura do Responsável', 30, yPosition, { align: 'center' });
    
    // Data de emissão
    yPosition += 15;
    const dataEmissao = new Date().toLocaleDateString('pt-BR');
    doc.setFontSize(10);
    doc.text(`Data de Emissão: ${dataEmissao}`, 20, yPosition);
    
    // Salvar PDF
    doc.save(`Termo_Voluntariado_${voluntario.nome.replace(/\s+/g, '_')}.pdf`);
};
