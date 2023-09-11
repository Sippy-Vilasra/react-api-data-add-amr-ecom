import React from 'react'
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';
import Button from '@components/Button';
import Form from '@components/Form';
import FormRow from '@components/FormRow';

const Update = () => {
    const router = useRouter();

    async function handleOnUpdate(e) {
        e.prevent.Default();
        const fields = Array.from(e.currentTarget.elements);
        const product = fields.filter(({ type }) => type !== 'submit').reduce((prev, current) => {
            prev[current.name] = current.value;
        }, {});
        const results = await fetch('http://172.15.14.240:3030/api/swagger/#/Admin/put_api_admin_edit_product', {

            method: 'POST',
            body: JSON.stringify({
                id: router.query.id,
                ...product
            })
        }).then(r => r.json())

        if (results?.results?.update_hashes?.includes(router.query.id)) {
            router.push(`/`);
        }
    }

    return (
        <Layout>
            <Head>
                <title>Update Store</title>
                <meta name="description" content="Add a product" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Section>
                <Container>
                    <h1>Add Product</h1>
                    <Form onSubmit={handleOnUpdate}>
                        <FormRow>
                            <label>Title</label>
                            <input type="text" name="title" defaultValue={router.query.title} />
                        </FormRow>
                        <FormRow>
                            <label>Price</label>
                            <input type="text" name="price" defaultValue={router.query.price} />
                        </FormRow>
                        <FormRow>
                            <label>Offer_Price</label>
                            <input type="text" name="offer_price" defaultValue={router.query.offer_price} />
                        </FormRow>
                        <FormRow>
                            <label>Description</label>
                            <input type="text" name="description" defaultValue={router.query.offer_description} />
                        </FormRow>
                        <FormRow>
                            <label>Product_type</label>
                            <input type="text" name="product_type" defaultValue={router.query.product_type} />
                        </FormRow>
                        <FormRow>
                            <label>Tags</label>
                            <input type="text" name="tags" defaultValue={router.query.tags} />
                        </FormRow>
                        <FormRow>
                            <label>File</label>
                            <input type="text" name="file" defaultValue={router.query.file} />
                        </FormRow>
                        <FormRow>
                            <Button type="submit">Update Product</Button>
                        </FormRow>
                    </Form>
                </Container>
            </Section>
        </Layout>
    )
}

export default Update