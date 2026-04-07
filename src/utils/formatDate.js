// Checks if the expiry date is valid and not expired
export const isExpiryValid = (expiry) => {
    if (!expiry) return false;
  
    const [month, year] = expiry.split("/");
  
    if (!month || !year) return false;
  
    const expMonth = Number(month);
    const expYear = Number("20" + year);
  
    if (expMonth < 1 || expMonth > 12) return false;
  
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
  
    // Expired if year is less OR same year but month is less
    if (
      expYear < currentYear ||
      (expYear === currentYear && expMonth < currentMonth)
    ) {
      return false;
    }
  
    return true;
};