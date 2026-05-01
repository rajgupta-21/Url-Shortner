import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    plan: { type: String, default: "Free Plan", required: true },
  },
  { timestamps: true },
);

export const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema);

const UrlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },

    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const UrlModel = mongoose.models.Url || mongoose.model("Url", UrlSchema);

const DeviceTypes = ["Mobile", "Desktop", "Tablet", "Bot"] as const;

const clickSchema = new mongoose.Schema(
  {
    urlId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Url",
      required: true,
    },

    country: {
      type: String,
    },

    device: {
      type: String,
      enum: DeviceTypes,
    },

    ip: {
      type: String,
    },
  },
  { timestamps: true },
);

export const ClickModel =
  mongoose.models.Click || mongoose.model("Click", clickSchema);
