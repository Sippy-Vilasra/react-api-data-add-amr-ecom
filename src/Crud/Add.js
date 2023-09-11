import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from "@components/layout"
import Section from '@components/Section';
import Container from '@components/Container';
import Button from '@components/Button';
import Form from '@components/Form';
import FormRow from '@components/FormRow';

const Add = () => {
    const router = useRouter();
    async function handleOnAdd(e) {
        e.preventDefault();

        const fields = Array.from(e.currentTarget.elements);
        const product = fields.filter(({ type }) => type !== 'submit').reduce((prev, current) => {
            prev[current.name] = current.value;
            return prev;
        }, {});
        const results = await fetch('http://172.15.14.240:3030/api/swagger/#/Admin/post_api_admin_add_product', {
            method: 'POST',
            body: JSON.stringify(product)
        }).then(r => r.json())
        if (results?.data?.id) {
            router.push(`/`);
        }
    }
    return (
        <Layout>
            <Head>
                <title>Add Store</title>
                <meta name="description" content="Add a product" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Section>
                <Container>
                    <h1>Add Product</h1>
                    <Form onSubmit={handleOnAdd}>
                        <FormRow>
                            <label>Title</label>
                            <input type="text" name="title" />
                        </FormRow>
                        <FormRow>
                            <label>Price</label>
                            <input type="text" name="price" />
                        </FormRow>
                        <FormRow>
                            <label>Offer_Price</label>
                            <input type="text" name="price" />
                        </FormRow>
                        <FormRow>
                            <label>Description</label>
                            <input type="text" name="description" />
                        </FormRow>
                        <FormRow>
                            <label>Product_type</label>
                            <input type="text" name="product_type" />
                        </FormRow>
                        <FormRow>
                            <label>Tags</label>
                            <input type="text" name="tags" />
                        </FormRow>
                        <FormRow>
                            <label>File</label>
                            <input type="text" name="file" />
                        </FormRow>
                        <FormRow>
                            <Button type="submit">Add Product</Button>
                        </FormRow>
                    </Form>
                </Container>
            </Section>
        </Layout>
    )
}

export default Add