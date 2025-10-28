-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "Online_Orders" (
	"id" uuid PRIMARY KEY NOT NULL,
	"oo_amount" numeric(8, 2) NOT NULL,
	"oo_customer_name" text NOT NULL,
	"oo_customer_contact" text NOT NULL,
	"oo_delivery_status" varchar(255) DEFAULT 'pending' NOT NULL,
	"oo_confirmation" varchar(255) DEFAULT 'pending',
	"oo_created_at" timestamp(0) NOT NULL,
	"oo_delivery_date" date NOT NULL,
	CONSTRAINT "Online_Orders_oo_confirmation_check" CHECK ((oo_confirmation)::text = ANY ((ARRAY['pending'::character varying, 'confirmed'::character varying])::text[])),
	CONSTRAINT "Online_Orders_oo_delivery_status_check" CHECK ((oo_delivery_status)::text = ANY ((ARRAY['canceled'::character varying, 'pending'::character varying, 'delivered'::character varying])::text[]))
);
--> statement-breakpoint
CREATE TABLE "Online_Order_Items" (
	"id" uuid PRIMARY KEY NOT NULL,
	"ooi_online_order_id" uuid NOT NULL,
	"ooi_item_id" uuid NOT NULL,
	"ooi_item_cost" numeric(8, 2) NOT NULL,
	"ooi_item_qty" numeric(8, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Purchase_Orders" (
	"id" uuid PRIMARY KEY NOT NULL,
	"p_order_supplier" uuid NOT NULL,
	"p_order_amount" numeric(8, 2) NOT NULL,
	"p_order_payment_status" varchar(255) DEFAULT 'not_paid' NOT NULL,
	"p_order_bill_imageUrl" text,
	"p_order_payment_method" varchar(255) DEFAULT 'cash' NOT NULL,
	"p_order_payment_date" date,
	"p_order_payment_imageUrl" text,
	"p_order_created_at" timestamp(0) NOT NULL,
	"p_order_amount_paid" numeric(8, 2) DEFAULT '0' NOT NULL,
	CONSTRAINT "Purchase_Orders_p_order_payment_method_check" CHECK ((p_order_payment_method)::text = ANY ((ARRAY['cash'::character varying, 'upi'::character varying])::text[])),
	CONSTRAINT "Purchase_Orders_p_order_payment_status_check" CHECK ((p_order_payment_status)::text = ANY ((ARRAY['fully_paid'::character varying, 'not_paid'::character varying, 'partial_paid'::character varying])::text[]))
);
--> statement-breakpoint
CREATE TABLE "Purchase_Order_Items" (
	"id" uuid PRIMARY KEY NOT NULL,
	"poi_purchase_order_id" uuid NOT NULL,
	"poi_item_id" uuid NOT NULL,
	"poi_item_qty" numeric(8, 2) NOT NULL,
	"poi_per_item_cost" numeric(8, 2) NOT NULL,
	"poi_total_cost" numeric(8, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Sales" (
	"id" uuid PRIMARY KEY NOT NULL,
	"sales_amount" numeric(8, 2) NOT NULL,
	"sales_date" date NOT NULL,
	"sales_created_at" timestamp(0) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Sales_items" (
	"id" uuid PRIMARY KEY NOT NULL,
	"si_sales_id" uuid NOT NULL,
	"si_item_id" uuid NOT NULL,
	"si_sale_price" numeric(8, 2) NOT NULL,
	"si_item_qty" numeric(8, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Items" (
	"id" uuid PRIMARY KEY NOT NULL,
	"item_name" text NOT NULL,
	"item_min_price" numeric(8, 2) NOT NULL,
	"item_max_price" numeric(8, 2) NOT NULL,
	"item_usecase" text NOT NULL,
	"item_location" text NOT NULL,
	"item_current_avg_cost" numeric(8, 2) NOT NULL,
	"item_image_url" text,
	"item_qr_code" text,
	"item_unit_type" varchar(255) DEFAULT 'piece' NOT NULL,
	"item_alternative_names" json DEFAULT '[]'::json NOT NULL,
	"item_created_at" timestamp(0) NOT NULL,
	"item_updated_at" timestamp(0) NOT NULL,
	"item_qty" numeric(8, 2) NOT NULL,
	CONSTRAINT "Items_item_unit_type_check" CHECK ((item_unit_type)::text = ANY ((ARRAY['piece'::character varying, 'weight'::character varying])::text[]))
);
--> statement-breakpoint
CREATE TABLE "Suppliers" (
	"id" uuid PRIMARY KEY NOT NULL,
	"supplier_name" text NOT NULL,
	"supplier_items_supplied" json NOT NULL,
	"supplier_contact" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Online_Order_Items" ADD CONSTRAINT "online_order_items_ooi_item_id_foreign" FOREIGN KEY ("ooi_item_id") REFERENCES "public"."Items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Online_Order_Items" ADD CONSTRAINT "online_order_items_ooi_online_order_id_foreign" FOREIGN KEY ("ooi_online_order_id") REFERENCES "public"."Online_Orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Purchase_Orders" ADD CONSTRAINT "purchase_orders_p_order_supplier_foreign" FOREIGN KEY ("p_order_supplier") REFERENCES "public"."Suppliers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Purchase_Order_Items" ADD CONSTRAINT "purchase_order_items_poi_item_id_foreign" FOREIGN KEY ("poi_item_id") REFERENCES "public"."Items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Purchase_Order_Items" ADD CONSTRAINT "purchase_order_items_poi_purchase_order_id_foreign" FOREIGN KEY ("poi_purchase_order_id") REFERENCES "public"."Purchase_Orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Sales_items" ADD CONSTRAINT "sales_items_si_item_id_foreign" FOREIGN KEY ("si_item_id") REFERENCES "public"."Items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Sales_items" ADD CONSTRAINT "sales_items_si_sales_id_foreign" FOREIGN KEY ("si_sales_id") REFERENCES "public"."Sales"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "online_orders_oo_delivery_status_index" ON "Online_Orders" USING btree ("oo_delivery_status" text_ops);--> statement-breakpoint
CREATE INDEX "purchase_orders_p_order_payment_status_index" ON "Purchase_Orders" USING btree ("p_order_payment_status" text_ops);--> statement-breakpoint
CREATE INDEX "sales_sales_date_index" ON "Sales" USING btree ("sales_date" date_ops);--> statement-breakpoint
CREATE INDEX "items_item_name_index" ON "Items" USING btree ("item_name" text_ops);
*/