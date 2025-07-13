export const UserUpload = async (inputs) => {
  try {
    const response = await fetch("/legacy/api/add_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return { success: true, message: data.message };
  } catch (error) {
    console.error("Server error: ", error);
    return { success: false, error: error.message };
  }
};
