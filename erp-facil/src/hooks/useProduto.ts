export const useProduto = () => {
  
    const validarPreco = (price: number) => {
      return price > 0;
    };
  
    
    const validarQuantidade = (quantity: number) => {
      return Number.isInteger(quantity) && quantity > 0;
    };
  

    const validarImagemUrl = (imageUrl: string) => {
      const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i;
      return urlRegex.test(imageUrl);
    };
  
    return {
      validarPreco,
      validarQuantidade,
      validarImagemUrl,
    };
  };
  