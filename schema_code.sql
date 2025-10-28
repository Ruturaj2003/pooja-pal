CREATE TABLE "Items"(
    "id" UUID NOT NULL,
    "item_name" TEXT NOT NULL,
    "item_min_price" DECIMAL(8, 2) NOT NULL,
    "item_max_price" DECIMAL(8, 2) NOT NULL,
    "item_usecase" TEXT NOT NULL,
    "item_location" TEXT NOT NULL,
    "item_current_avg_cost" DECIMAL(8, 2) NOT NULL,
    "item_image_url" TEXT NULL,
    "item_qr_code" TEXT NULL,
    "item_unit_type" VARCHAR(255) CHECK
        (
            "item_unit_type" IN('piece', 'weight')
        ) NOT NULL DEFAULT 'piece',
        "item_alternative_names" JSON NOT NULL DEFAULT '[]',
        "item_created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
        "item_updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
        "item_qty" DECIMAL(8, 2) NOT NULL
);
CREATE INDEX "items_item_name_index" ON
    "Items"("item_name");
ALTER TABLE
    "Items" ADD PRIMARY KEY("id");
CREATE TABLE "Suppliers"(
    "id" UUID NOT NULL,
    "supplier_name" TEXT NOT NULL,
    "supplier_items_supplied" JSON NOT NULL,
    "supplier_contact" TEXT NOT NULL
);
ALTER TABLE
    "Suppliers" ADD PRIMARY KEY("id");
CREATE TABLE "Purchase_Orders"(
    "id" UUID NOT NULL,
    "p_order_supplier" UUID NOT NULL,
    "p_order_amount" DECIMAL(8, 2) NOT NULL,
    "p_order_payment_status" VARCHAR(255) CHECK
        (
            "p_order_payment_status" IN(
                'fully_paid',
                'not_paid',
                'partial_paid'
            )
        ) NOT NULL DEFAULT 'not_paid',
        "p_order_bill_imageUrl" TEXT NULL,
        "p_order_payment_method" VARCHAR(255)
    CHECK
        (
            "p_order_payment_method" IN('cash', 'upi')
        ) NOT NULL DEFAULT 'cash',
        "p_order_payment_date" DATE NULL,
        "p_order_payment_imageUrl" TEXT NULL,
        "p_order_created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
        "p_order_amount_paid" DECIMAL(8, 2) NOT NULL DEFAULT '0'
);
CREATE INDEX "purchase_orders_p_order_payment_status_index" ON
    "Purchase_Orders"("p_order_payment_status");
ALTER TABLE
    "Purchase_Orders" ADD PRIMARY KEY("id");
CREATE TABLE "Purchase_Order_Items"(
    "id" UUID NOT NULL,
    "poi_purchase_order_id" UUID NOT NULL,
    "poi_item_id" UUID NOT NULL,
    "poi_item_qty" DECIMAL(8, 2) NOT NULL,
    "poi_per_item_cost" DECIMAL(8, 2) NOT NULL,
    "poi_total_cost" DECIMAL(8, 2) NOT NULL
);
ALTER TABLE
    "Purchase_Order_Items" ADD PRIMARY KEY("id");
CREATE TABLE "Sales"(
    "id" UUID NOT NULL,
    "sales_amount" DECIMAL(8, 2) NOT NULL,
    "sales_date" DATE NOT NULL,
    "sales_created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
CREATE INDEX "sales_sales_date_index" ON
    "Sales"("sales_date");
ALTER TABLE
    "Sales" ADD PRIMARY KEY("id");
CREATE TABLE "Sales_items"(
    "id" UUID NOT NULL,
    "si_sales_id" UUID NOT NULL,
    "si_item_id" UUID NOT NULL,
    "si_sale_price" DECIMAL(8, 2) NOT NULL,
    "si_item_qty" DECIMAL(8, 2) NOT NULL
);
ALTER TABLE
    "Sales_items" ADD PRIMARY KEY("id");
CREATE TABLE "Online_Orders"(
    "id" UUID NOT NULL,
    "oo_amount" DECIMAL(8, 2) NOT NULL,
    "oo_customer_name" TEXT NOT NULL,
    "oo_customer_contact" TEXT NOT NULL,
    "oo_delivery_status" VARCHAR(255) CHECK
        (
            "oo_delivery_status" IN('canceled', 'pending', 'delivered')
        ) NOT NULL DEFAULT 'pending',
        "oo_confirmation" VARCHAR(255)
    CHECK
        (
            "oo_confirmation" IN('pending', 'confirmed')
        ) NULL DEFAULT 'pending',
        "oo_created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
        "oo_delivery_date" DATE NOT NULL
);
CREATE INDEX "online_orders_oo_delivery_status_index" ON
    "Online_Orders"("oo_delivery_status");
ALTER TABLE
    "Online_Orders" ADD PRIMARY KEY("id");
CREATE TABLE "Online_Order_Items"(
    "id" UUID NOT NULL,
    "ooi_online_order_id" UUID NOT NULL,
    "ooi_item_id" UUID NOT NULL,
    "ooi_item_cost" DECIMAL(8, 2) NOT NULL,
    "ooi_item_qty" DECIMAL(8, 2) NOT NULL
);
ALTER TABLE
    "Online_Order_Items" ADD PRIMARY KEY("id");
ALTER TABLE
    "Online_Order_Items" ADD CONSTRAINT "online_order_items_ooi_online_order_id_foreign" FOREIGN KEY("ooi_online_order_id") REFERENCES "Online_Orders"("id");
ALTER TABLE
    "Purchase_Order_Items" ADD CONSTRAINT "purchase_order_items_poi_purchase_order_id_foreign" FOREIGN KEY("poi_purchase_order_id") REFERENCES "Purchase_Orders"("id");
ALTER TABLE
    "Sales_items" ADD CONSTRAINT "sales_items_si_sales_id_foreign" FOREIGN KEY("si_sales_id") REFERENCES "Sales"("id");
ALTER TABLE
    "Online_Order_Items" ADD CONSTRAINT "online_order_items_ooi_item_id_foreign" FOREIGN KEY("ooi_item_id") REFERENCES "Items"("id");
ALTER TABLE
    "Purchase_Orders" ADD CONSTRAINT "purchase_orders_p_order_supplier_foreign" FOREIGN KEY("p_order_supplier") REFERENCES "Suppliers"("id");
ALTER TABLE
    "Sales_items" ADD CONSTRAINT "sales_items_si_item_id_foreign" FOREIGN KEY("si_item_id") REFERENCES "Items"("id");
ALTER TABLE
    "Purchase_Order_Items" ADD CONSTRAINT "purchase_order_items_poi_item_id_foreign" FOREIGN KEY("poi_item_id") REFERENCES "Items"("id");