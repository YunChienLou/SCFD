export const TimeStampConverter = (seconds) => {
  
  if (undefined != seconds) {
    let d = new Date(seconds*1000).toLocaleDateString("TW");
    return d.split('T')[0]
    // .toISOString()
  }
};
