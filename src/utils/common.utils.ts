export const formatIdSubjectHistory = (
  current: number,
  index: number,
  requestType: string,
  id: string,
  createdDate: Date,
) => {
  let formattedId;
  if (requestType.includes('Erasure')) {
    formattedId = `${new Date(createdDate).getFullYear()}ER${id}`;
    return formattedId;
  }
  if (requestType.includes('Access')) {
    formattedId = `${new Date(createdDate).getFullYear()}AC${id}`;
    return formattedId;
  }
  if (requestType.includes('Object')) {
    formattedId = `${new Date(createdDate).getFullYear()}OB${id}`;
    return formattedId;
  }
  if (requestType.includes('Rectification')) {
    formattedId = `${new Date(createdDate).getFullYear()}RC${id}`;
    return formattedId;
  }
  if (requestType.includes('Data Portability')) {
    formattedId = `${new Date(createdDate).getFullYear()}DP${id}`;
    return formattedId;
  }
  if (requestType.includes('Restriction')) {
    formattedId = `${new Date(createdDate).getFullYear()}RS${id}`;
    return formattedId;
  }
  if (requestType.includes('Withdraw')) {
    formattedId = `${new Date(createdDate).getFullYear()}WD${id}`;
    return formattedId;
  }
  if (requestType.includes('Not to be subject to automate decision making')) {
    formattedId = `${new Date(createdDate).getFullYear()}NA${id}`;
    return formattedId;
  }

  return `${(current - 1) * 10 + index + 1 || index}`;
};

export function capitalizeFirstLetter(string: string) {
  if (!string) return string;
  const stringLowercase = string.toLowerCase();
  return stringLowercase?.charAt(0).toUpperCase() + stringLowercase?.slice(1);
}
