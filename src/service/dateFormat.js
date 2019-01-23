const padding = i => {
  return (i < 10 ? "0" : "") + i;
};

const dateFormat = (unixTimeMs, formatStr) => {
  if (!unixTimeMs) return "";
  const date = new Date(Number(unixTimeMs));

  return formatStr.replace(/yyyy|MM|dd|HH|mm|ss/g, function(pattern) {
    switch (pattern) {
      case "yyyy":
        return padding(date.getFullYear());
      case "MM":
        return padding(date.getMonth() + 1);
      case "mm":
        return padding(date.getMinutes());
      case "dd":
        return padding(date.getDate());
      case "HH":
        return padding(date.getHours());
      case "ss":
        return padding(date.getSeconds());
      default:
        return null;
    }
  });
}

export default dateFormat;