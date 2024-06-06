import React from 'react';
import ChatBot from 'react-chatbotify';
import ImageCard from './ImageCard';

const MyChatBot = () => {
    const [form, setForm] = React.useState({});
    const formStyle = {
        marginTop: 10,
        marginLeft: 20,
        border: "1px solid #491d8d",
        padding: 10,
        borderRadius: 5,
        maxWidth: 300
    };

    const productLinks = {
        "AMOLED_DISPLAY_WATCHES": {
            "0-20": [
                { link: "https://cloudbazzar.netlify.app/detail/wave-neo-g643", imgSrc: "image_link_here", title: "Wave Neo" }
                // Add more products as needed
            ],
            "20-40": [],
            "40-60": [],
            "60-80": [],
            "80-100": [],
            "100-120": [],
            "120-160": [],
            "160-240": []
        },
        "Headphones": {
            "Wireless Headphones": {
                "0-20": [
                    { link: "https://cloudbazzar.netlify.app/detail/ptron-basspods-p481-gnsv", imgSrc: "image_link_here", title: "pTron Basspods" },
                    // Add more products as needed
                ],
                "20-40": [
                    { link: "https://cloudbazzar.netlify.app/detail/zenbuds-pro-1-max-anc-tws-earbuds-dugh", imgSrc: "image_link_here", title: "Zenbuds Pro" },
                    // Add more products as needed
                ],
                "40-60": [
                    { link: "https://cloudbazzar.netlify.app/detail/ptron-bassbuds-nyx-in-ear-cy56", imgSrc: "image_link_here", title: "pTron Bassbuds" },
                    // Add more products as needed
                ],
                "60-80": [
                    { link: "https://cloudbazzar.netlify.app/detail/jbl-live-pro-2-tws-8fwr", imgSrc: "image_link_here", title: "JBL Live Pro" },
                    // Add more products as needed
                ],
                "80-100": [],
                "100-120": [],
                "120-160": [
                    { link: "https://cloudbazzar.netlify.app/detail/jbl-live-770nc-8mq7", imgSrc: "image_link_here", title: "JBL Live 770NC" }
                    // Add more products as needed
                ],
                "160-240": [
                    { link: "https://cloudbazzar.netlify.app/detail/jbl-tour-one-m2-ajh4", imgSrc: "image_link_here", title: "JBL Tour One" }
                    // Add more products as needed
                ]
            },
            "Wired Headphones": {
                "0-20": [
                    { link: "https://cloudbazzar.netlify.app/detail/jbl-tune-310c-usb-c-npbf", imgSrc: "image_link_here", title: "JBL Tune 310C" },
                    // Add more products as needed
                ],
                "20-40": [],
                "40-60": [],
                "60-80": [],
                "80-100": [],
                "100-120": [],
                "120-160": [],
                "160-240": []
            }
        },
        "neckbands": {
            "0-20": [],
            "20-40": [
                { link: "https://cloudbazzar.netlify.app/detail/ptron-tangent-pro-enc-wireless-bluetooth-52-headphones-ikhz", imgSrc: "image_link_here", title: "pTron Tangent Pro" },
                // Add more products as needed
            ],
            "40-60": [],
            "60-80": [],
            "80-100": [],
            "100-120": [],
            "120-160": [],
            "160-240": []
        },
        "speakers": {
            "0-20": [
                { link: "https://cloudbazzar.netlify.app/detail/home-speakers-noise-zest-3w-wireless-speaker-noise-zest-3w-wireless-speaker-hju5", imgSrc: "image_link_here", title: "Noise Zest 3W" },
                // Add more products as needed
            ],
            "20-40": [
                { link: "https://cloudbazzar.netlify.app/detail/jbl-go-3-j5no", imgSrc: "image_link_here", title: "JBL Go 3" },
                // Add more products as needed
            ],
            "40-60": [],
            "60-80": [],
            "80-100": [
                { link: "https://cloudbazzar.netlify.app/detail/party-pal-185-ksy2", imgSrc: "image_link_here", title: "Party Pal 185" },
                // Add more products as needed
            ],
            "100-120": [
                { link: "https://cloudbazzar.netlify.app/detail/jbl-flip-5-uxds", imgSrc: "image_link_here", title: "JBL Flip 5" },
                // Add more products as needed
            ],
            "120-160": [],
            "160-240": []
        }
    };

    const flow = {
        start: {
            message: "Hello there! What is your name?",
            function: (params) => setForm({ ...form, name: params.userInput }),
            path: "ask_choice"
        },
        ask_choice: {
            message: (params) => `Nice to meet you ${params.userInput}, Which category of product are you looking for?`,
            checkboxes: { items: ["AMOLED_DISPLAY_WATCHES", "Headphones", "neckbands", "speakers"], min: 1, max: 4 },
            chatDisabled: true,
            function: (params) => setForm({ ...form, category: params.userInput }),
            path: (params) => {
                if (params.userInput.includes("Headphones")) {
                    return "ask_headphone_type";
                }
                return "ask_price_range";
            }
        },
        ask_headphone_type: {
            message: "What type of headphones are you looking for?",
            checkboxes: { items: ["Wireless Headphones", "Wired Headphones"], min: 1, max: 2 },
            chatDisabled: true,
            function: (params) => setForm({ ...form, headphone_type: params.userInput }),
            path: "ask_price_range"
        },
        ask_price_range: {
            message: "Please select your preferred price range:",
            checkboxes: { items: ["0-20", "20-40", "40-60", "60-80", "80-100", "100-120", "120-160", "160-240"], min: 1, max: 3 },
            chatDisabled: true,
            function: (params) => setForm({ ...form, price_range: params.userInput }),
            path: "show_product_link"
        },
        show_product_link: {
            custom: (params) => {
                const { category, headphone_type, price_range } = form;
                const products = headphone_type
                    ? productLinks[category][headphone_type][price_range]
                    : productLinks[category][price_range];
                return (
                    <div>
                        {products.length > 0 ? products.map((product, index) => (
                            <ImageCard key={index} link={product.link} imgSrc={product.imgSrc} title={product.title} />
                        )) : <p>No products available for this selection.</p>}
                    </div>
                );
            },
            chatDisabled: true,
            path: "end"
        },
        end: {
            message: "Thank you for your interest, we will get back to you shortly!",
            chatDisabled: true,
            path: "start"
        }
    };

	return (
        <ChatBot
            options={{
                header: { title: "Cloudbazzar" },
                theme: {
                    embedded: false,
                    showFooter: false,
                    styles: {
                        root: {
                            background: "linear-gradient(to right, orange, red)"
                        },
                        chatContainer: {
                            background: "linear-gradient(to right, orange, red)"
                        },
                        header: {
                            background: "linear-gradient(to right, orange, red)",
                            color: "#fff"
                        },
                        messageBox: {
                            background: "#ebb943"
                        },
                        userMessageBox: {
                            background: "#f8f8f8"
                        },
                        botMessageBox: {
                            background: "#fff" // Adjust background color here
                        }
                    }
                },
                chatHistory: { storageKey: "example_advanced_form" }
            }}
            flow={flow}
            customComponents={{
                show_product_link: (params) => {
                    const { category, headphone_type, price_range } = form;
                    const products = headphone_type
                        ? productLinks[category]?.[headphone_type]?.[price_range] || []
                        : productLinks[category]?.[price_range] || [];
                    return (
                        <div>
                            {products.length > 0 ? products.map((product, index) => (
                                <ImageCard key={index} link={product.link} imgSrc={product.imgSrc} title={product.title} />
                            )) : <p>No products available for this selection.</p>}
                        </div>
                    );
                }
            }}
        />
    );
};

export default MyChatBot;