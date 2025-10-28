import { relations } from "drizzle-orm/relations";
import {
  pgTable,
  index,
  uuid,
  numeric,
  text,
  timestamp,
  date,
  foreignKey,
  json,
  pgEnum,
} from "drizzle-orm/pg-core";

// ENUMS
export const deliveryStatusEnum = pgEnum("delivery_status", [
  "canceled",
  "pending",
  "delivered",
]);
export const paymentStatusEnum = pgEnum("payment_status", [
  "fully_paid",
  "not_paid",
  "partial_paid",
]);
export const paymentMethodEnum = pgEnum("payment_method", ["cash", "upi"]);
export const unitTypeEnum = pgEnum("unit_type", ["piece", "weight"]);
export const confirmationStatusEnum = pgEnum("confirmation_status", [
  "pending",
  "confirmed",
]);

export const onlineOrders = pgTable(
  "Online_Orders",
  {
    id: uuid().primaryKey().notNull().defaultRandom(),
    ooAmount: numeric("oo_amount", { precision: 8, scale: 2 }).notNull(),
    ooCustomerName: text("oo_customer_name").notNull(),
    ooCustomerContact: text("oo_customer_contact").notNull(),
    ooDeliveryStatus: deliveryStatusEnum("oo_delivery_status")
      .default("pending")
      .notNull(),
    ooConfirmation:
      confirmationStatusEnum("oo_confirmation").default("pending"),
    ooCreatedAt: timestamp("oo_created_at", { mode: "date" })
      .notNull()
      .defaultNow(),
    ooDeliveryDate: date("oo_delivery_date").notNull(),
  },
  (table) => [
    index("online_orders_oo_delivery_status_index").using(
      "btree",
      table.ooDeliveryStatus.asc().nullsLast().op("text_ops")
    ),
  ]
);

export const onlineOrderItems = pgTable(
  "Online_Order_Items",
  {
    id: uuid().primaryKey().notNull().defaultRandom(),
    ooiOnlineOrderId: uuid("ooi_online_order_id").notNull(),
    ooiItemId: uuid("ooi_item_id").notNull(),
    ooiItemCost: numeric("ooi_item_cost", { precision: 8, scale: 2 }).notNull(),
    ooiItemQty: numeric("ooi_item_qty", { precision: 8, scale: 2 }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.ooiItemId],
      foreignColumns: [items.id],
      name: "online_order_items_ooi_item_id_foreign",
    }),
    foreignKey({
      columns: [table.ooiOnlineOrderId],
      foreignColumns: [onlineOrders.id],
      name: "online_order_items_ooi_online_order_id_foreign",
    }),
  ]
);

export const purchaseOrders = pgTable(
  "Purchase_Orders",
  {
    id: uuid().primaryKey().notNull().defaultRandom(),
    pOrderSupplier: uuid("p_order_supplier").notNull(),
    pOrderAmount: numeric("p_order_amount", {
      precision: 8,
      scale: 2,
    }).notNull(),
    pOrderPaymentStatus: paymentStatusEnum("p_order_payment_status")
      .default("not_paid")
      .notNull(),
    pOrderBillImageUrl: text("p_order_bill_imageUrl"),
    pOrderPaymentMethod: paymentMethodEnum("p_order_payment_method")
      .default("cash")
      .notNull(),
    pOrderPaymentDate: date("p_order_payment_date"),
    pOrderPaymentImageUrl: text("p_order_payment_imageUrl"),
    pOrderCreatedAt: timestamp("p_order_created_at", {
      mode: "date",
    })
      .notNull()
      .defaultNow(),
    pOrderAmountPaid: numeric("p_order_amount_paid", { precision: 8, scale: 2 })
      .default("0")
      .notNull(),
  },
  (table) => [
    index("purchase_orders_p_order_payment_status_index").using(
      "btree",
      table.pOrderPaymentStatus.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.pOrderSupplier],
      foreignColumns: [suppliers.id],
      name: "purchase_orders_p_order_supplier_foreign",
    }),
  ]
);

export const purchaseOrderItems = pgTable(
  "Purchase_Order_Items",
  {
    id: uuid().primaryKey().notNull().defaultRandom(),
    poiPurchaseOrderId: uuid("poi_purchase_order_id").notNull(),
    poiItemId: uuid("poi_item_id").notNull(),
    poiItemQty: numeric("poi_item_qty", { precision: 8, scale: 2 }).notNull(),
    poiPerItemCost: numeric("poi_per_item_cost", {
      precision: 8,
      scale: 2,
    }).notNull(),
    poiTotalCost: numeric("poi_total_cost", {
      precision: 8,
      scale: 2,
    }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.poiItemId],
      foreignColumns: [items.id],
      name: "purchase_order_items_poi_item_id_foreign",
    }),
    foreignKey({
      columns: [table.poiPurchaseOrderId],
      foreignColumns: [purchaseOrders.id],
      name: "purchase_order_items_poi_purchase_order_id_foreign",
    }),
  ]
);

export const sales = pgTable(
  "Sales",
  {
    id: uuid().primaryKey().notNull().defaultRandom(),
    salesAmount: numeric("sales_amount", { precision: 8, scale: 2 }).notNull(),
    salesDate: date("sales_date").notNull(),
    salesCreatedAt: timestamp("sales_created_at", { mode: "date" })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("sales_sales_date_index").using(
      "btree",
      table.salesDate.asc().nullsLast().op("date_ops")
    ),
  ]
);

export const salesItems = pgTable(
  "Sales_items",
  {
    id: uuid().primaryKey().notNull().defaultRandom(),
    siSalesId: uuid("si_sales_id").notNull(),
    siItemId: uuid("si_item_id").notNull(),
    siSalePrice: numeric("si_sale_price", { precision: 8, scale: 2 }).notNull(),
    siItemQty: numeric("si_item_qty", { precision: 8, scale: 2 }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.siItemId],
      foreignColumns: [items.id],
      name: "sales_items_si_item_id_foreign",
    }),
    foreignKey({
      columns: [table.siSalesId],
      foreignColumns: [sales.id],
      name: "sales_items_si_sales_id_foreign",
    }),
  ]
);

export const items = pgTable(
  "Items",
  {
    id: uuid().primaryKey().notNull().defaultRandom(),
    itemName: text("item_name").notNull(),
    itemMinPrice: numeric("item_min_price", {
      precision: 8,
      scale: 2,
    }).notNull(),
    itemMaxPrice: numeric("item_max_price", {
      precision: 8,
      scale: 2,
    }).notNull(),
    itemUsecase: text("item_usecase").notNull(),
    itemLocation: text("item_location").notNull(),
    itemCurrentAvgCost: numeric("item_current_avg_cost", {
      precision: 8,
      scale: 2,
    }).notNull(),
    itemImageUrl: text("item_image_url"),
    itemQrCode: text("item_qr_code"),
    itemUnitType: unitTypeEnum("item_unit_type").default("piece").notNull(),
    itemAlternativeNames: json("item_alternative_names")
      .$type<string[]>()
      .default([])
      .notNull(),
    itemCreatedAt: timestamp("item_created_at", { mode: "date" })
      .notNull()
      .defaultNow(),
    itemUpdatedAt: timestamp("item_updated_at", { mode: "date" })
      .notNull()
      .defaultNow(),
    itemQty: numeric("item_qty", { precision: 8, scale: 2 }).notNull(),
  },
  (table) => [
    index("items_item_name_index").using(
      "btree",
      table.itemName.asc().nullsLast().op("text_ops")
    ),
  ]
);

export const suppliers = pgTable("Suppliers", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  supplierName: text("supplier_name").notNull(),
  supplierItemsSupplied: json("supplier_items_supplied").notNull(),
  supplierContact: text("supplier_contact").notNull(),
});

/*


RELATIONS 




*/

export const onlineOrderItemsRelations = relations(
  onlineOrderItems,
  ({ one }) => ({
    item: one(items, {
      fields: [onlineOrderItems.ooiItemId],
      references: [items.id],
    }),
    onlineOrder: one(onlineOrders, {
      fields: [onlineOrderItems.ooiOnlineOrderId],
      references: [onlineOrders.id],
    }),
  })
);

export const itemsRelations = relations(items, ({ many }) => ({
  onlineOrderItems: many(onlineOrderItems),
  purchaseOrderItems: many(purchaseOrderItems),
  salesItems: many(salesItems),
}));

export const onlineOrdersRelations = relations(onlineOrders, ({ many }) => ({
  onlineOrderItems: many(onlineOrderItems),
}));

export const purchaseOrdersRelations = relations(
  purchaseOrders,
  ({ one, many }) => ({
    supplier: one(suppliers, {
      fields: [purchaseOrders.pOrderSupplier],
      references: [suppliers.id],
    }),
    purchaseOrderItems: many(purchaseOrderItems),
  })
);

export const suppliersRelations = relations(suppliers, ({ many }) => ({
  purchaseOrders: many(purchaseOrders),
}));

export const purchaseOrderItemsRelations = relations(
  purchaseOrderItems,
  ({ one }) => ({
    item: one(items, {
      fields: [purchaseOrderItems.poiItemId],
      references: [items.id],
    }),
    purchaseOrder: one(purchaseOrders, {
      fields: [purchaseOrderItems.poiPurchaseOrderId],
      references: [purchaseOrders.id],
    }),
  })
);

export const salesItemsRelations = relations(salesItems, ({ one }) => ({
  item: one(items, {
    fields: [salesItems.siItemId],
    references: [items.id],
  }),
  sale: one(sales, {
    fields: [salesItems.siSalesId],
    references: [sales.id],
  }),
}));

export const salesRelations = relations(sales, ({ many }) => ({
  salesItems: many(salesItems),
}));
