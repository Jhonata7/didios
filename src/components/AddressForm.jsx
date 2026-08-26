import {
  useState,
} from "react";

export default function AddressForm({
  address,
  setAddress,
}) {
  const [
    searchingCep,
    setSearchingCep,
  ] = useState(false);

  const [
    cepError,
    setCepError,
  ] = useState("");

  function formatCep(value) {
    const digits =
      value.replace(/\D/g, "");

    if (digits.length <= 5) {
      return digits;
    }

    return `${digits.slice(
      0,
      5
    )}-${digits.slice(5, 8)}`;
  }

  async function searchCep(
    rawCep
  ) {
    const cep =
      rawCep.replace(/\D/g, "");

    if (cep.length !== 8) {
      return;
    }

    setSearchingCep(true);
    setCepError("");

    try {
      const response =
        await fetch(
          `https://viacep.com.br/ws/${cep}/json/`
        );

      if (!response.ok) {
        throw new Error(
          "Erro ao consultar CEP"
        );
      }

      const data =
        await response.json();

      if (data.erro) {
        setCepError(
          "CEP não encontrado."
        );

        return;
      }

      setAddress(
        (current) => ({
          ...current,

          cep:
            formatCep(cep),

          street:
            data.logradouro ||
            "",

          district:
            data.bairro || "",

          city:
            data.localidade ||
            "",

          state:
            data.uf || "",
        })
      );
    } catch (error) {
      console.error(
        "Erro ao buscar CEP:",
        error
      );

      setCepError(
        "Não foi possível buscar o CEP."
      );
    } finally {
      setSearchingCep(false);
    }
  }

  function handleChange(e) {
    const {
      name,
      value,
    } = e.target;

    if (name === "cep") {
      const formatted =
        formatCep(value);

      setAddress(
        (current) => ({
          ...current,
          cep: formatted,
        })
      );

      setCepError("");

      const digits =
        formatted.replace(
          /\D/g,
          ""
        );

      if (digits.length === 8) {
        searchCep(digits);
      }

      return;
    }

    setAddress(
      (current) => ({
        ...current,
        [name]: value,
      })
    );
  }

  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-sm
        border
        p-6
        md:p-8
      "
    >
      <h2
        className="
          text-2xl
          font-black
          mb-6
        "
      >
        Endereço de Entrega
      </h2>

      <div className="grid gap-4">
        <div>
          <input
            name="cep"
            inputMode="numeric"
            maxLength={9}
            value={
              address.cep
            }
            onChange={
              handleChange
            }
            placeholder="CEP"
            className="
              w-full
              border
              rounded-xl
              px-5
              py-4
              outline-none
              focus:border-black
            "
          />

          {searchingCep && (
            <p
              className="
                text-sm
                text-gray-500
                mt-2
              "
            >
              Buscando CEP...
            </p>
          )}

          {cepError && (
            <p
              className="
                text-sm
                text-red-600
                mt-2
              "
            >
              {cepError}
            </p>
          )}
        </div>

        <input
          name="street"
          value={
            address.street
          }
          onChange={
            handleChange
          }
          placeholder="Rua"
          className="
            border
            rounded-xl
            px-5
            py-4
            outline-none
            focus:border-black
          "
        />

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-4
          "
        >
          <input
            name="number"
            value={
              address.number
            }
            onChange={
              handleChange
            }
            placeholder="Número"
            className="
              border
              rounded-xl
              px-5
              py-4
              outline-none
              focus:border-black
            "
          />

          <input
            name="district"
            value={
              address.district
            }
            onChange={
              handleChange
            }
            placeholder="Bairro"
            className="
              border
              rounded-xl
              px-5
              py-4
              outline-none
              focus:border-black
            "
          />
        </div>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-4
          "
        >
          <input
            name="city"
            value={
              address.city
            }
            onChange={
              handleChange
            }
            placeholder="Cidade"
            className="
              border
              rounded-xl
              px-5
              py-4
              outline-none
              focus:border-black
            "
          />

          <input
            name="state"
            value={
              address.state
            }
            onChange={
              handleChange
            }
            maxLength={2}
            placeholder="Estado"
            className="
              border
              rounded-xl
              px-5
              py-4
              outline-none
              focus:border-black
              uppercase
            "
          />
        </div>
      </div>
    </div>
  );
}