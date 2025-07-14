const dev = true;
const server = dev ? "/api/" : "/legacy/api/";
const addPathToServer = (path) => {
  return `${server}${path}`;
};

export const UserUpload = async (inputs) => {
  try {
    const response = await fetch(addPathToServer("add_user"), {
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

export const ListImages = async () => {
  try {
    const response = await fetch(addPathToServer("list_images"));
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Error when fetching images");
    }
    return { success: true, images: data.images };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};

export const ListUsers = async () => {
  try {
    const response = await fetch(addPathToServer("list_users"));
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Error when fetching images");
    }
    return { success: true, users: data.users };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};
