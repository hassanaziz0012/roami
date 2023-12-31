import React, { useEffect, useRef, useState } from "react";
import "./PinForm.scss";

const PinForm = ({ locationLinkState, nameState, cityState, countryState, descriptionState }) => {
    //menu open

    const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);

    const [locationLink, setLocationLink] = locationLinkState;
    const [name, setName] = nameState;
    const [city, setCity] = cityState;
    const [country, setCountry] = countryState;
    const [description, setDescription] = descriptionState;
    
    const [locationName, setLocationName] = useState("");

    const [countryCity, setCountryCity] = useState([]);

    useEffect(() => {
        const getCountries = async () => {
            const resp = await fetch('./cities.json');
            const data = await resp.json();
            setCountryCity(data);
        }
        getCountries();
    }, [])
    
    const filteredCountryCity = countryCity.filter(
        (i) =>
            i.name?.toLowerCase().includes(locationName?.toLowerCase()) ||
            i.country?.toLowerCase().includes(locationName?.toLowerCase())
    );

    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setIsLocationMenuOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <section id="create_pin_form">
            <div className="container">
                <div className="form_contents">
                    <div>
                        <div className="input_groups">
                            <div>
                                <h3>Link*</h3>
                                <input
                                    type="text"
                                    placeholder="Paste your Google Maps link here"
                                    required
                                    value={locationLink}
                                    onChange={(e) => setLocationLink(e.target.value)}
                                />
                            </div>
                            <div>
                                <h3>Name*</h3>
                                <input
                                    type="text"
                                    placeholder="e.g. romantic bars in Paris"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div>
                                <h3>Location*</h3>
                                <div className="dropdown_wrapper" ref={containerRef}>
                                    <input
                                        className="d-block w-100"
                                        type="text"
                                        value={locationName}
                                        onChange={(e) => {
                                            setLocationName(e.target.value);
                                            setIsLocationMenuOpen(true);
                                        }}
                                        placeholder="Enter your location here"
                                        required
                                        onClick={() => {
                                            setIsLocationMenuOpen(!isLocationMenuOpen);
                                        }}
                                    />

                                    {isLocationMenuOpen &&
                                        locationName?.length > 2 &&
                                        filteredCountryCity?.length > 0 && (
                                            <div className="drop_down_menu" style={{ overflow: "scroll" }}>
                                                {filteredCountryCity?.map((it) => (
                                                    <li
                                                        key={it.geonameid}
                                                        onClick={() => {
                                                            setLocationName(`${it.name} , ${it.country}`);
                                                            setCity(it.name);
                                                            setCountry(it.country);
                                                            setIsLocationMenuOpen(false);
                                                        }}
                                                    >
                                                        {" "}
                                                        {it.name},<span>{it.country}</span>
                                                    </li>
                                                ))}
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>

                        <div className="input_description">
                            <h3>Description*</h3>
                            <textarea
                                value={description}
                                required
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe your  places with up to 200 words.."
                                name=""
                                id=""
                                cols="30"
                                rows="10"
                                maxLength="200"
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PinForm;
