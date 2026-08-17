function parseFirestoreDocument(doc) {
  const fields = doc.fields || {};
  const result = { id: doc.name.split("/").pop() };
  
  for (const [key, value] of Object.entries(fields)) {
    if ("stringValue" in value) {
      result[key] = value.stringValue;
    } else if ("booleanValue" in value) {
      result[key] = value.booleanValue;
    } else if ("integerValue" in value) {
      result[key] = Number(value.integerValue);
    } else if ("doubleValue" in value) {
      result[key] = Number(value.doubleValue);
    } else if ("arrayValue" in value) {
      const values = value.arrayValue.values || [];
      result[key] = values.map(v => {
        if ("stringValue" in v) return v.stringValue;
        if ("integerValue" in v) return Number(v.integerValue);
        if ("doubleValue" in v) return Number(v.doubleValue);
        if ("booleanValue" in v) return v.booleanValue;
        return v;
      });
    } else if ("nullValue" in value) {
      result[key] = null;
    } else {
      result[key] = value;
    }
  }
  return result;
}

export async function getProperties() {
  try {
    const url = "https://firestore.googleapis.com/v1/projects/homenet-47307/databases/(default)/documents/newAd?pageSize=300";
    const res = await fetch(url, { next: { revalidate: 30 } }); // Cache for 30 seconds
    if (!res.ok) throw new Error("Firestore REST API response error");
    const data = await res.json();
    return (data.documents || []).map(parseFirestoreDocument);
  } catch (error) {
    console.error("Error in getProperties REST helper:", error);
    return [];
  }
}
