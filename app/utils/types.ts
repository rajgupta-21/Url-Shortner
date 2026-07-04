export type UserResponse = {
  user: {
    _id: string;
    name: string;
    email: string;
    plan: string;
    createdAt: string;
  };
};

export type CountBucket = {
  _id: string;
  count: number;
};

export type ClicksPerWeek = {
  _id: { year: number; week: number };
  count: number;
};

export type ClicksPerMonth = {
  _id: { year: number; month: number };
  count: number;
};

export type AnalyticsResponse = {
  message: string;
  totalClicks: number;
  clicksPerCountry: CountBucket[];
  clicksPerDevice: CountBucket[];
  clicksPerDay: CountBucket[];
  clicksPerWeek: ClicksPerWeek[];
  clicksPerMonth: ClicksPerMonth[];
};
