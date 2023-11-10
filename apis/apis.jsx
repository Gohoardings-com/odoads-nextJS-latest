import instance from "./commonapi";

let leadCrud = "leadCrud";
let lead = "lead";
let authentication = "authentication";
let medias = "medias";
let register = "register";
let pbb = "pbb";
let customers = "customers";
let tradeLandload = "tradeLandload";
let campaign = "campaign";
let invoicesGet = "invoicesGet";
let invoices = "invoices";
let clientWorkship = "clientWorkship";
let tasks = "tasks";
let staff = "staff";
let staffRoles = "staffRoles";
let permission = "permissions";
let leadStatus = "leadStatus";
let razorpay = "razorpay";
let excel = "excel";

export const updatePlan = async (amount) => {
  const { data } = await instance.put(excel,{amount});
  return data;
};

export const checkplan = async () => {
  const { data } = await instance.get(razorpay);
  return data;
};

export const payment = async (amount) => {
  const { data } = await instance.post(razorpay,{amount});
  return data;
};

export const verifyPay = async (pay_id,order_id,res_signature) => {
  const { data } = await instance.put(razorpay,{pay_id,order_id,res_signature});
  return data;
};

export const loginApi = async (formData) => {
  const { data } = await instance.patch(authentication, { formData });
  return data;
};
export const logoutApi = async (id) => {
  const { data } = await instance.put(authentication, {id});
  return data;
};

export const allLeadsApi = async () => {
  const { data } = await instance.get(lead);
  return data;
};

export const filterLeadsApi = async () => {
  const { data } = await instance.put(lead);
  return data;
};

export const updateLeadsApi = async (value) => {
  const { data } = await instance.post(leadCrud, { value });
  return data;
};

export const deletLeadsApi = async (id) => {
  
  const { data } = await instance.patch(`${id}`);
  return data;
};

export const countryListApi = async () => {
  const { data } = await instance.patch(lead);
  return data;
};

export const createLeadsApi = async (value) => {
  const { data } = await instance.post(lead, { value });
  return data;
};
export const getUserApi = async () => {
  const { data } = await instance.get(authentication);
  return data;
};
export const getMediasApi = async () => {
  const { data } = await instance.get(medias);
  return data;
};

export const createPPTApi = async () => {
  const { data } = await instance.post(ppt);
  return data;
};
export const createMediasApi = async (value) => {
  const { data } = await instance.post(medias, { value });
  return data;
};
export const editMediasApi = async (state) => {
  const { data } = await instance.put(medias, { state });
  return data;
};

export const deletMediasApi = async (id) => {
  const { data } = await instance.delete(`${id}`);
  return data;
};

export const getSubCategoryApi = async (media) => {
  const { data } = await instance.patch(medias, {media});
  return data;
};
export const getStateApi = async () => {
  const { data } = await instance.put(leadCrud);
  return data;
};
export const getCityApi = async (name) => {
  const { data } = await instance.patch(leadCrud, { name });
  return data;
};

export const sendOtp = async (phone) => {
  const { data } = await instance.patch(register, { phone });
  return data;
};

export const firstUser = async () => {
  const { data } = await instance.get(register);
  return data;
};

export const verifyOtp = async (otp) => {
  const { data } = await instance.put(register, { otp });
  return data;
};

export const registerComapnyApi = async (value) => {
  const { data } = await instance.post(register, {
   value
  });
  return data;
};

export const bookMediaApi = async (value) => {
  const { data } = await instance.patch(pbb, { value });
  return data;
};

export const blockkMediaApi = async (value) => {
  const { data } = await instance.post(pbb, { value });
  return data;
};

export const createExcelApi = async (docs, model) => {
  const { data } = await instance.put(pbb, { docs, model });
  return data;
};

export const getCustomerApi = async () => {
  const { data } = await instance.get(customers);
  return data;
};

export const addClientApi = async (formData) => {
  const { data } = await instance.post(customers, { formData });
  return data;
};

export const deleteCustomerApi = async (id) => {
  const { data } = await instance.patch(customers, { id });
  return data;
};
export const getAllLandlordsApi = async () => {
  const { data } = await instance.get(tradeLandload);
  return data;
};
export const addLandlordsApi = async (value) => {
  const { data } = await instance.post(tradeLandload, { value });
  return data;
};
export const deletLandlordsApi = async (id) => {
  const { data } = await instance.patch(tradeLandload, { id });
  return data;
};

export const updateLandlordsApi = async (value) => {
  const { data } = await instance.put(tradeLandload, { value });
  return data;
};

export const allTasksApi = async () => {
  const { data } = await instance.get(tasks);
  return data;
};
export const updateTasksApi = async (value) => {
  const { data } = await instance.patch(tasks, { value });
  return data;
};
export const deletTasksApi = async (id) => {
  const { data } = await instance.post(tasks, { id });
  return data;
};

export const getRelatedUser = async (user) => {
  const { data } = await instance.get(user);
  return data;
};

export const createTaskApi = async (posts) => {
  const { data } = await instance.put(tasks, { posts });
  return data;
};

export const updateCustomer = async (formData) => {
  const { data } = await instance.put(customers, { formData });
  return data;
};
export const getAllCampaignApi = async () => {
  const { data } = await instance.get(campaign);
  return data;
};
export const creatCampaignApi = async (value) => {
  const { data } = await instance.post(campaign, { value });
  return data;
};
export const updateCampaignApi = async (value) => {
  const { data } = await instance.put(campaign, { value });
  return data;
};
export const deletCampaignApi = async (id) => {
  const { data } = await instance.patch(campaign, { id });
  return data;
};

export const getAllRollesApi = async () => {
  const { data } = await instance.get(staffRoles);
  return data;
};

export const addRolllesApi = async (value) => {
  const { data } = await instance.post(staffRoles, { value });
  return data;
};

export const deletRolllesApi = async (id) => {
  const { data } = await instance.patch(campaign, { id });
  return data;
};

export const getAllStaffApi = async () => {
  const { data } = await instance.get(staff);
  return data;
};

export const addStaffApi = async (value) => {
  const { data } = await instance.post(staff, { value });
  return data;
};
export const editStaffApi = async (value, permission) => {
  const { data } = await instance.put(staff, { value, permission });
  return data;
};

export const deletStaffApi = async (id) => {
  const { data } = await instance.patch(staff, { id });
  return data;
};

export const allPermissionsApi = async () => {
  const { data } = await instance.get(permission);
  return data;
};

export const getStaffData = async (id) => {
  const { data } = await instance.get(`${id}`);
  return data;
};


export const invoicesItemApi = async (id) => {
  const { data } = await instance.post(leadStatus, {id});
  return data;
};


export const createInvoiceApi = async (finalState, addData) => {
  const { data } = await instance.post(invoices,{finalState, addData});
  return data;
};


export const getInvoices = async () => {
  const { data } = await instance.get(invoices);
  return data;
};


export const matchforgetotp = async (company, contactOTP) => {
  const { data } = await instance.patch(invoicesGet,{company, contactOTP});
  return data;
};


export const genrateforgetOtp = async (company,contactPhone) => {
  const { data } = await instance.post(invoicesGet,{company,contactPhone});
  return data;
};


export const changePassword = async (contactPhone, password, confirmPassword, company) => {
  const { data } = await instance.post(authentication,{contactPhone, password, confirmPassword, company});
  return data;
};


export const alltaxApi = async () => {
  const { data } = await instance.put(invoicesGet);
  return data;
};


export const allPermissionapi = async (id, roleName) => {
  const { data } = await instance.patch(leadStatus, {id, roleName});
  return data;
};


export const rolePermissions = async (id) => {
  const { data } = await instance.put(leadStatus, {id});
  return data;
};


export const updateRoles = async (roleData,id) => {
  const { data } = await instance.put(staffRoles, {roleData,id});
  return data;
};


export const addImgeApi = async (formdata) => {
  const { data } = await instance.post("upload", formdata);
  return data;
};

export const editItemInvoice = async (addItem) => {
  const { data } = await instance.patch(permission, addItem);
  return data;
};


export const updateInvoice = async (finalState) => {
  const { data } = await instance.patch(invoices, finalState);
  return data;
};

export const deleteInvoice = async (id) => {
  const { data } = await instance.put(invoices, {id});
  return data;
};

