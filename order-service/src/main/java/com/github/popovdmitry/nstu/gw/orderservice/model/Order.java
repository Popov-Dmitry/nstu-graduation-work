package com.github.popovdmitry.nstu.gw.orderservice.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "orders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(example = "341", position = 0)
    private Long id;

    @Column(name = "product_details_id")
    @ApiModelProperty(example = "123", position = 1)
    private Long productDetailsId;

    @Column(name = "product_id")
    @ApiModelProperty(example = "12345", position = 2)
    private Long productId;

    @Column(name = "count")
    @ApiModelProperty(example = "2", position = 4)
    private Long count;

    @Column(name = "customer_id")
    @ApiModelProperty(example = "55", position = 5)
    private Long customerId;

    @Column(name = "address")
    @ApiModelProperty(example = "Россия, г. Новосибирск, ул. Ленина 12, кв. 34", position = 6)
    private String address;

    @Column(name = "seller_id")
    @ApiModelProperty(example = "7", position = 7)
    private Long sellerId;

    @Column(name = "status")
    @ApiModelProperty(example = "ACCEPTED", position = 8)
    private Status status;

    @Column(name = "order_date")
    @ApiModelProperty(example = "2022-05-09", position = 9)
    private Date orderDate;

    @Column(name = "product_type")
    @ApiModelProperty(example = "CLOTHES", position = 10)
    private ProductType productType;

    @Column(name = "regular_price")
    @ApiModelProperty(example = "1999", position = 11)
    private Long regularPrice;

    @Column(name = "price")
    @ApiModelProperty(example = "999", position = 12)
    private Long price;

    @Column(name = "title")
    @ApiModelProperty(example = "Джемпер O'STIN", position = 13)
    private String title;

    @Column(name = "variant")
    @ApiModelProperty(example = "Синий, XXL", position = 14)
    private String variant;

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Return ret;
}
